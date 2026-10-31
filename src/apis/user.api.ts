import { AppContext } from '@/contexts/app.context'
import { User } from '@/models/interface/user.interface'
import { userApi } from '@/services/user.service'
import { useHandleError } from '@/utils/handleErrorAPI'
import { setUserToLS } from '@/utils/storage'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

export const useGetMe = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { handleToastError } = useHandleError()
  return useMutation({
    mutationFn: userApi.getMe,
    onSuccess: ({ data }) => {
      setUserToLS(data.data as User)
      setIsAuthenticated(true)
      setProfile(data.data as User)
    },
    onError: handleToastError
  })
}
