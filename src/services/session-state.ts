export type SessionState = 'unknown' | 'guest' | 'authenticated' | 'expired'
let state: SessionState = 'unknown'
export const sessionEvents = new EventTarget()
export const getSessionState = () => state
export const setSessionState = (next: SessionState) => {
  state = next
  sessionEvents.dispatchEvent(new Event('change'))
}
