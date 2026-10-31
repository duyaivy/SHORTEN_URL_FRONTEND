import config from '@/constants/config.const'
import { clearLS } from '@/utils/storage'
import { getSessionState, setSessionState } from './session-state'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

interface SessionRequest extends InternalAxiosRequestConfig {
  _retry?: boolean
  _sessionGeneration?: number
}

const axiosClient = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})
// Separate client: a refresh response must never enter the retry interceptor.
export const refreshClient = axios.create({ baseURL: config.baseUrl, withCredentials: true, timeout: 15000 })
let refreshPromise: Promise<void> | null = null
let generation = 0

const expireSession = () => {
  clearLS()
  setSessionState('expired')
}

axiosClient.interceptors.request.use((request: SessionRequest) => {
  request._sessionGeneration = generation
  // Freeze the intent on the request so a retry cannot become anonymous.
  if (request.method === 'post' && request.url === '/' && getSessionState() !== 'guest') {
    request.headers.set('X-Auth-Intent', 'required')
  }
  return request
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ data?: { code?: string } }>) => {
    const request = error.config as SessionRequest | undefined
    // Only guards signal this code. Login, password checks, and unrelated 401/403s do not refresh.
    if (!request || error.response?.status !== 401 || error.response.data?.data?.code !== 'SESSION_REQUIRED') {
      throw error
    }
    if (request._retry) {
      expireSession()
      throw error
    }
    request._retry = true
    // A guard challenge establishes authenticated intent even if UI restoration was stale.
    if (request.method === 'post' && request.url === '/') request.headers.set('X-Auth-Intent', 'required')
    if (request._sessionGeneration === generation) {
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post('/auth/refresh-token', {})
          .then(() => {
            generation++
          })
          .catch((refreshError: unknown) => {
            if (axios.isAxiosError(refreshError) && refreshError.response?.status === 401) expireSession()
            throw refreshError
          })
          .finally(() => {
            refreshPromise = null
          })
      }
      await refreshPromise
    }
    // Cookies are installed by the browser. Never inject a Bearer token.
    return axiosClient(request)
  }
)

export default axiosClient
