import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios'

const response = (config: InternalAxiosRequestConfig, data = {}, status = 200) => ({
  config,
  data,
  status,
  statusText: String(status),
  headers: new AxiosHeaders()
})
const unauthorized = (config: InternalAxiosRequestConfig, code = 'SESSION_REQUIRED') =>
  new AxiosError('Unauthorized', 'ERR_BAD_REQUEST', config, undefined, response(config, { data: { code } }, 401))

beforeEach(() => {
  vi.resetModules()
  const values = new Map<string, string>()
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key)
  })
})

async function clients() {
  const client = await import('../src/services/axios-client')
  const session = await import('../src/services/session-state')
  return { ...client, ...session }
}

describe('cookie session retry pipeline', () => {
  it.each(['guest', 'authenticated'] as const)(
    '%s creation sends the correct intent without Bearer credentials',
    async (state) => {
      const { default: client, setSessionState } = await clients()
      setSessionState(state)
      client.defaults.adapter = async (config) => {
        expect(config.withCredentials).toBe(true)
        expect(config.headers.get('Authorization')).toBeUndefined()
        expect(config.headers.get('X-Auth-Intent')).toBe(state === 'guest' ? undefined : 'required')
        return response(config)
      }
      await client.post('/', { url: 'https://example.com' })
    }
  )

  it('shares one refresh, retains intent and writes exactly once per concurrent operation', async () => {
    const { default: client, refreshClient, setSessionState } = await clients()
    setSessionState('authenticated')
    let renewed = false
    let writes = 0
    const refresh = vi.fn(async (config: InternalAxiosRequestConfig) => {
      await new Promise((resolve) => setTimeout(resolve, 20))
      renewed = true
      return response(config)
    })
    refreshClient.defaults.adapter = refresh
    client.defaults.adapter = async (config) => {
      if (!renewed) throw unauthorized(config)
      expect(config.headers.get('X-Auth-Intent')).toBe('required')
      writes++
      return response(config)
    }
    await Promise.all([client.post('/', { url: 'https://one.test' }), client.post('/', { url: 'https://two.test' })])
    expect(refresh).toHaveBeenCalledTimes(1)
    expect(writes).toBe(2)
  })

  it.each([401, 500, 0])('settles every waiter on refresh failure %s without guest fallback', async (status) => {
    const { default: client, refreshClient, setSessionState, getSessionState } = await clients()
    setSessionState('authenticated')
    let attempts = 0
    client.defaults.adapter = async (config) => {
      attempts++
      throw unauthorized(config)
    }
    const refresh = vi.fn(async (config: InternalAxiosRequestConfig) => {
      await new Promise((resolve) => setTimeout(resolve, 20))
      throw new AxiosError(
        'Refresh failed',
        'ERR_NETWORK',
        config,
        undefined,
        status ? response(config, {}, status) : undefined
      )
    })
    refreshClient.defaults.adapter = refresh
    const results = await Promise.allSettled([client.post('/'), client.post('/')])
    expect(results.map((r) => r.status)).toEqual(['rejected', 'rejected'])
    expect(refresh).toHaveBeenCalledTimes(1)
    expect(attempts).toBe(2)
    expect(getSessionState()).toBe(status === 401 ? 'expired' : 'authenticated')
  })

  it('pins ownership intent after a guard challenge even if UI thought it was a guest', async () => {
    const { default: client, refreshClient, setSessionState } = await clients()
    setSessionState('guest')
    let renewed = false
    refreshClient.defaults.adapter = async (config) => {
      renewed = true
      return response(config)
    }
    client.defaults.adapter = async (config) => {
      if (!renewed) throw unauthorized(config)
      expect(config.headers.get('X-Auth-Intent')).toBe('required')
      return response(config)
    }
    await client.post('/')
  })

  it('never refreshes unrelated login/authorization failures', async () => {
    const { default: client, refreshClient } = await clients()
    const refresh = vi.fn()
    refreshClient.defaults.adapter = refresh
    client.defaults.adapter = async (config) => {
      throw unauthorized(config, 'BAD_PASSWORD')
    }
    await expect(client.post('/auth/login')).rejects.toBeInstanceOf(AxiosError)
    expect(refresh).not.toHaveBeenCalled()
  })

  it('retries once only, even when the renewed session is rejected', async () => {
    const { default: client, refreshClient } = await clients()
    const send = vi.fn(async (config: InternalAxiosRequestConfig) => {
      throw unauthorized(config)
    })
    const refresh = vi.fn(async (config: InternalAxiosRequestConfig) => response(config))
    client.defaults.adapter = send
    refreshClient.defaults.adapter = refresh
    await expect(client.post('/')).rejects.toBeInstanceOf(AxiosError)
    expect(send).toHaveBeenCalledTimes(2)
    expect(refresh).toHaveBeenCalledTimes(1)
  })

  it('reuses the refreshed generation for a late 401 from an older request', async () => {
    const { default: client, refreshClient } = await clients()
    const refresh = vi.fn(async (config: InternalAxiosRequestConfig) => response(config))
    refreshClient.defaults.adapter = refresh
    const attempts = new Map<string, number>()
    client.defaults.adapter = async (config) => {
      const count = attempts.get(config.url!) ?? 0
      attempts.set(config.url!, count + 1)
      if (!count) {
        if (config.url === '/slow') await new Promise((resolve) => setTimeout(resolve, 30))
        throw unauthorized(config)
      }
      return response(config)
    }
    await Promise.all([client.get('/fast'), client.get('/slow')])
    expect(refresh).toHaveBeenCalledTimes(1)
  })
})

describe('page reload', () => {
  it('restores the profile using the refresh cookie after access expiry and removes legacy JS tokens', async () => {
    const { default: client, refreshClient, getSessionState } = await clients()
    localStorage.setItem('access_token', 'legacy')
    localStorage.setItem('refresh_token', 'legacy')
    let renewed = false
    refreshClient.defaults.adapter = async (config) => {
      renewed = true
      return response(config)
    }
    client.defaults.adapter = async (config) => {
      if (!renewed) throw unauthorized(config)
      return response(config, { data: { id: 'owner', email: 'owner@example.com' } })
    }
    const { restoreSession } = await import('../src/services/session')
    const [one, two] = await Promise.all([restoreSession(), restoreSession()])
    expect(one).toEqual(two)
    expect(getSessionState()).toBe('authenticated')
    expect(localStorage.getItem('access_token')).toBeNull()
    expect(localStorage.getItem('refresh_token')).toBeNull()
  })

  it.each([false, true])(
    'distinguishes a new guest from expired session (previous profile: %s)',
    async (hadSession) => {
      const { default: client, refreshClient, getSessionState } = await clients()
      if (hadSession) localStorage.setItem('user', JSON.stringify({ id: 'owner' }))
      client.defaults.adapter = async (config) => {
        throw unauthorized(config)
      }
      refreshClient.defaults.adapter = async (config) => {
        throw unauthorized(config)
      }
      const { restoreSession } = await import('../src/services/session')
      expect(await restoreSession()).toBeNull()
      expect(getSessionState()).toBe(hadSession ? 'expired' : 'guest')
    }
  )

  it('does not classify a failed restoration as guest or logout', async () => {
    const { default: client, getSessionState } = await clients()
    client.defaults.adapter = async (config) => {
      throw new AxiosError('Offline', 'ERR_NETWORK', config)
    }
    const { restoreSession } = await import('../src/services/session')
    await expect(restoreSession()).rejects.toThrow('Offline')
    expect(getSessionState()).toBe('unknown')
  })
})
