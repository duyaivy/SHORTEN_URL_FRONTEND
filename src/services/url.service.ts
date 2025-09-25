import axiosClient from '@/services/axios-client'
import { ResponseWithPagination, SuccessResponse } from '@/models/interface/response.interface'
import { UrlType } from '@/models/types/url.type'
import { GetPaginationConfig, URL, UrlMiniUpdate } from '@/models/interface/url.interface'

const API_GET_URL = '/api/'
const API_URL = '/'
const API_MY_URLS = '/my-urls'
const API_CHANGE_ACTIVE_URL = '/my-urls/active'
export const urlApi = {
  shortenUrl: (params: UrlType) => {
    return axiosClient.post<SuccessResponse<URL>>(API_URL, params)
  },
  getAlias: (alias: string) => {
    return axiosClient.get<SuccessResponse<URL>>(API_GET_URL + alias)
  },
  getAliasWithPW: (alias: string, password: string) => {
    return axiosClient.post<SuccessResponse<URL>>(API_GET_URL + alias, { password })
  },
  getMyUrls: (params: GetPaginationConfig) => {
    return axiosClient.get<SuccessResponse<ResponseWithPagination<URL>>>(API_MY_URLS, { params })
  },
  updateUrl: (alias: string, url: Partial<URL>) => {
    return axiosClient.patch<SuccessResponse<URL>>(`${API_URL}${alias}`, url)
  },
  changeActive: (urls: UrlMiniUpdate[]) => {
    return axiosClient.patch<SuccessResponse<null>>(API_CHANGE_ACTIVE_URL, { urls })
  },
  delete: (ids: string[]) => {
    return axiosClient.delete<SuccessResponse<null>>(API_MY_URLS, { data: { ids } })
  }
}
// 3 hướng làm sao mỗi lần chụp ảnh tốn ít thời gian
// Cần nén ảnh trước khi gửi đi để giảm băng thông( có thể giảm độ phân giải,.. )
// thay vì gửi từng frame 1, thì gửi 10 frame thì chỉ gửi sự thay đổi giữa các frame
