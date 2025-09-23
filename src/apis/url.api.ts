import { mutationKeys } from '@/helpers/key-tanstack'
import { SuccessResponse } from '@/models/interface/response.interface'
import { URL } from '@/models/interface/url.interface'
import { urlApi } from '@/services/url.service'
import { useMutation, useQuery } from '@tanstack/react-query'
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
