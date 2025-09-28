import axiosClient from '@/services/axios-client'
import { AuthResponse } from '@/models/interface/auth.interface'
import { SuccessResponse } from '@/models/interface/response.interface'
import { LoginType, RegisterType } from '@/models/types/auth.type'
import { Omit } from 'lodash'
const API_LOGIN_URL = '/auth/login'
const API_LOGOUT_URL = '/auth/logout'
const API_REGISTER_URL = '/auth/register'
const API_RESET_PASS_URL = '/auth/reset-password'
const API_FORGOT_PASS_URL = '/auth/forgot-password'
const API_REFRESH_TOKEN_URL = '/auth/refresh-token'
const API_LOGIN_GOOGLE = '/auth/callback'

export const authApi = {
  login: (params: LoginType) => {
    return axiosClient.post<SuccessResponse<AuthResponse>>(API_LOGIN_URL, params)
  },
  register: (params: Omit<RegisterType, 'confirmPassword'>) => {
    return axiosClient.post<SuccessResponse<AuthResponse>>(API_REGISTER_URL, params)
  },
  resetPassword: (params: { token: string; password: string }) => {
    return axiosClient.post<SuccessResponse<null>>(API_RESET_PASS_URL, params)
  },
  refreshToken: (token: string) => {
    return axiosClient.post<SuccessResponse<AuthResponse>>(API_REFRESH_TOKEN_URL, { token })
  },
  logout: (refresh_token: string) => {
    return axiosClient.delete<SuccessResponse<null>>(API_LOGOUT_URL, { data: { refresh_token } })
  },
  forgotPassword: (params: { email?: string }) => {
    return axiosClient.get<SuccessResponse<null>>(API_FORGOT_PASS_URL, { params })
  },
  loginWithGG: (params: { code: string }) => {
    return axiosClient.get<SuccessResponse<AuthResponse>>(API_LOGIN_GOOGLE, { params })
  }
}
