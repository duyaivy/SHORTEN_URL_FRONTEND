import axiosClient from '@/services/axios-client'
import { SuccessResponse } from '@/models/interface/response.interface'
import { UrlType } from '@/models/types/url.type'
import { URL } from '@/models/interface/url.interface'

const API_GET_URL = '/api/'
const API_URL = '/'
export const urlApi = {
  shortenUrl: (params: UrlType) => {
    return axiosClient.post<SuccessResponse<URL>>(API_URL, params)
  },
  getAlias: (alias: string) => {
    return axiosClient.get<SuccessResponse<URL>>(API_GET_URL + alias)
  },
  getAliasWithPW: (alias: string, password: string) => {
    return axiosClient.post<SuccessResponse<URL>>(API_GET_URL + alias, { password })
  }
}
