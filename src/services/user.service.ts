import axiosClient from './axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'
import {
  roleAddRequest,
  User,
  UserListConfig,
  UserRequest,
  UserResponse,
  UserUpdateRequest
} from '@/models/interface/user.interface'

const API_USER_URL = '/users'
const API_GET_ME_URL = '/users/me'

export const userApi = {
  get: (params: UserListConfig) => {
    return axiosClient.get<SuccessResponse<UserResponse>>(API_USER_URL, { params })
  },
  delete: (id: number) => {
    return axiosClient.delete<SuccessResponse<null>>(`${API_USER_URL}/${id}`)
  },
  update: (user: UserUpdateRequest) => {
    return axiosClient.put<SuccessResponse<User>>(API_USER_URL, user)
  },
  getById: (id: number) => {
    return axiosClient.get<SuccessResponse<User>>(`${API_USER_URL}/${id}`)
  },
  addRole: (params: roleAddRequest) => {
    return axiosClient.put<SuccessResponse<any>>(`${API_USER_URL}/roles`, params)
  },
  add: (user: UserRequest) => {
    return axiosClient.post<SuccessResponse<UserResponse>>(API_USER_URL, user)
  },
  getMe: () => {
    return axiosClient.get<SuccessResponse<User>>(API_GET_ME_URL)
  }
}
