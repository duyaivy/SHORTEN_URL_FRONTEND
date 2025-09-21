// define the AuthResponse interface
export interface AuthResponse {
  access_token: string
  refresh_token: string
}
export interface AuthErrorValidate {
  field?: string
  message?: string
}
