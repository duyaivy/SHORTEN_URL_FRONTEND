import { useQueryClient } from '@tanstack/react-query'
import { restoreSession } from '@/services/session'
import { getSessionState, sessionEvents } from '@/services/session-state'
import { createContext, Dispatch, ReactNode, SetStateAction, useState, useEffect } from 'react'

import { User } from '@/models/interface/user.interface'

import { getUserFromLocalStorage } from '@/utils/storage'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  profile: User | null
  setProfile: Dispatch<SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  profile: null,
  setProfile: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  const queryClient = useQueryClient()
  const [restoring, setRestoring] = useState(true)
  const [restoreError, setRestoreError] = useState(false)
  useEffect(() => {
    let active = true
    const onSessionChange = () => {
      const authenticated = getSessionState() === 'authenticated'
      setIsAuthenticated(authenticated)
      setProfile(authenticated ? getUserFromLocalStorage() : null)
      if (!authenticated) queryClient.clear()
    }
    sessionEvents.addEventListener('change', onSessionChange)
    restoreSession()
      .catch(() => {
        if (active) setRestoreError(true)
      })
      .finally(() => {
        if (active) setRestoring(false)
      })
    return () => {
      active = false
      sessionEvents.removeEventListener('change', onSessionChange)
    }
  }, [queryClient])

  if (restoring) return <p role='status'>Checking your session…</p>
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {restoreError && (
        <p role='alert'>
          Unable to verify your session. Please retry before creating a link.{' '}
          <button
            onClick={() => {
              restoreSession()
                .then(() => setRestoreError(false))
                .catch(() => setRestoreError(true))
            }}
          >
            Retry
          </button>
        </p>
      )}
      {children}
    </AppContext.Provider>
  )
}
