import { mutationKeys } from '@/helpers/key-tanstack'
import { SuccessResponse } from '@/models/interface/response.interface'
import { URL } from '@/models/interface/url.interface'
import { urlApi } from '@/services/url.service'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
interface useShortenUrlProps {
  onSuccess?: (data: AxiosResponse<SuccessResponse<URL>>) => void
}
export const useShortenUrlMutation = ({ onSuccess }: useShortenUrlProps) => {
  return useMutation({
    mutationKey: mutationKeys.shortenUrl,
    mutationFn: urlApi.shortenUrl,
    onSuccess
  })
}
