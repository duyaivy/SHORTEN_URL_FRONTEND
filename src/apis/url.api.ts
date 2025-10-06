import { STATE_TIME } from '@/constants/common.const'
import { mutationKeys, queryKeys } from '@/helpers/key-tanstack'
import { SuccessResponse } from '@/models/interface/response.interface'
import { GetPaginationConfig, QrHistory, URL } from '@/models/interface/url.interface'
import { urlApi } from '@/services/url.service'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
interface useShortenUrlProps {
  onSuccess?: (data: AxiosResponse<SuccessResponse<URL>>) => void
  onError?: (error: AxiosError) => void
}
interface useSaveQrHistoryProps {
  onSuccess?: (data: AxiosResponse<SuccessResponse<QrHistory>>) => void
  onError?: (error: AxiosError) => void
}

// shorten url
export const useShortenUrlMutation = ({ onSuccess, onError }: useShortenUrlProps) => {
  return useMutation({
    mutationKey: mutationKeys.shortenUrl,
    mutationFn: urlApi.shortenUrl,
    onSuccess,
    onError
  })
}
export const useSaveQrHistoryMutation = ({ onSuccess, onError }: useSaveQrHistoryProps) => {
  return useMutation({
    mutationKey: mutationKeys.saveQrHistory,
    mutationFn: urlApi.saveQrHistory,
    onSuccess,
    onError
  })
}

export const useGetShortenUrlMutation = ({ onSuccess, onError }: useShortenUrlProps) => {
  return useMutation({
    mutationKey: mutationKeys.getShortenUrl,
    mutationFn: ({ alias, password }: { alias: string; password: string }) => urlApi.getAliasWithPW(alias, password),
    onSuccess,
    onError
  })
}

interface useQueryAliasProps {
  alias: string
}
export const useQueryAlias = ({ alias }: useQueryAliasProps) => {
  return useQuery({
    queryKey: [queryKeys.alias, alias],
    queryFn: () => urlApi.getAlias(alias)
  })
}
export const useQueryMyUrls = (params: GetPaginationConfig) => {
  return useQuery({
    queryKey: [queryKeys.myUrls, params],
    queryFn: () => urlApi.getMyUrls(params),
    staleTime: STATE_TIME,
    placeholderData: keepPreviousData
  })
}

// delete
interface useDeleteUrlsProps {
  onSuccess?: (data: AxiosResponse<SuccessResponse<null>>) => void
  onError?: (error: AxiosError) => void
}
export const useDeleteUrlsMutation = ({ onSuccess, onError }: useDeleteUrlsProps) => {
  return useMutation({
    mutationKey: mutationKeys.deleteUrls,
    mutationFn: urlApi.delete,
    onSuccess,
    onError
  })
}

export const useChangeActiveMutation = ({ onSuccess, onError }: useDeleteUrlsProps) => {
  return useMutation({
    mutationKey: mutationKeys.changeActive,
    mutationFn: urlApi.changeActive,
    onSuccess,
    onError
  })
}

export const useUpdateUrlMutation = ({ onSuccess, onError }: useShortenUrlProps) => {
  return useMutation({
    mutationKey: mutationKeys.updateUrl,
    mutationFn: ({ alias, url }: { alias: string; url: Partial<URL> }) => urlApi.updateUrl(alias, url),
    onSuccess,
    onError
  })
}
// qr history
export const useQueryQrHistory = (params: GetPaginationConfig) => {
  return useQuery({
    queryKey: [queryKeys.qrHistory, params],
    queryFn: () => urlApi.getQrHistory(params),
    staleTime: STATE_TIME,
    placeholderData: keepPreviousData
  })
}
export const useDeleteQrHistoryMutation = ({ onSuccess, onError }: useDeleteUrlsProps) => {
  return useMutation({
    mutationKey: mutationKeys.deleteQrHistory,
    mutationFn: urlApi.deleteQrHistory,
    onSuccess,
    onError
  })
}
// recapcha
interface useRecapchaProps {
  onSuccess?: (data: AxiosResponse<SuccessResponse<null>>) => void
  onError?: (error: AxiosError) => void
}
export const useRecapchaMutation = ({ onSuccess, onError }: useRecapchaProps) => {
  return useMutation({
    mutationKey: mutationKeys.recapcha,
    mutationFn: urlApi.recapcha,
    onSuccess,
    onError
  })
}
