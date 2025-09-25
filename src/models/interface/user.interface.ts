import { PaginationResponse } from './response.interface'

export interface User {
  _id?: string
  username?: string
  email?: string
  password?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}
export interface UserUpdate {
  name?: string
  phone?: string
  imageId?: number
  addres?: string
  dateOfBirth?: Date
  newPassword?: string
  oldPassword?: string
}
export interface UserRequest {
  email: string
  password: string
  name: string
  phone: string
  address: string
  avatar: string
  dateOfBirth: string
  roleId: number
}
export interface UserUpdateRequest extends Omit<UserUpdate, 'dateOfBirth'> {
  dateOfBirth?: string
}

export type role = {
  id?: number
  description?: string
  active?: boolean
  createBy?: string
  updateBy?: string
  createAt?: string
  updateAt?: string
}

export interface UserResponse {
  meta: PaginationResponse
  data: User[]
}

export interface UserListConfig {
  page?: number
  size?: number
  searchName?: string
  sortBy?: 'userTotalSuccessBookings' | 'userTotalFailedBookings' | 'saleTotalBookings' | 'saleSuccessPercent'
  sortDirection?: 'asc' | 'desc'
}
