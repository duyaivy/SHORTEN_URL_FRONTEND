import { STATE_TIME } from '@/constants/common.const'
import { mutationKeys } from '@/helpers/key-tanstack'
import { SuccessResponse } from '@/models/interface/response.interface'
import { GetPaginationConfig, URL } from '@/models/interface/url.interface'
import { urlApi } from '@/services/url.service'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
interface useShortenUrlProps {
  onSuccess?: (data: AxiosResponse<SuccessResponse<URL>>) => void
  onError?: (error: AxiosError) => void
}
export const useShortenUrlMutation = ({ onSuccess, onError }: useShortenUrlProps) => {
  return useMutation({
    mutationKey: mutationKeys.shortenUrl,
    mutationFn: urlApi.shortenUrl,
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
    queryKey: ['alias', alias],
    queryFn: () => urlApi.getAlias(alias)
  })
}
export const useQueryMyUrls = (params: GetPaginationConfig) => {
  return useQuery({
    queryKey: ['myUrls', params],
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
