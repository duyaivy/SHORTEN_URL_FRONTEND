import { role, User } from './user.interface'

// define the Login interface
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}
export interface SentEmailResponse {
  email?: string
  token?: string
}

// define the RegisterReponse interface
export interface RegisterReponse {
  id?: number
  email?: string
  password?: string
  accessToken?: string
  refreshToken?: string
  roles?: role[]
  emailConfirmed?: boolean
}
