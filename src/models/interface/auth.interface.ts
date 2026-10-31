// define the AuthResponse interface
export interface AuthResponse {
  access_token?: string
  refresh_token?: string
  accessToken?: string
  refreshToken?: string
  user?: any
}
export interface AuthErrorValidate {
  field?: string
  message?: string
}
