import axios from 'axios'
import { userApi } from './user.service'
import {
  getUserFromLocalStorage,
  removeAccessTokenFromLS,
  removeRefreshTokenFromLS,
  setUserToLS
} from '@/utils/storage'
import { setSessionState } from './session-state'

let restoration: ReturnType<typeof restore> | undefined
async function restore() {
  const hadSession = Boolean(getUserFromLocalStorage())
  // Migrate legacy clients away from JavaScript-readable credentials.
  removeAccessTokenFromLS()
  removeRefreshTokenFromLS()
  try {
    const response = await userApi.getMe()
    const user = response.data.data
    setUserToLS(user)
    setSessionState('authenticated')
    return user
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      setSessionState(hadSession ? 'expired' : 'guest')
      return null
    }
    // An outage does not establish that this browser is a guest.
    throw error
  }
}
export function restoreSession() {
  restoration ??= restore().finally(() => {
    restoration = undefined
  })
  return restoration
}
