import { mutationKeys } from '@/helpers/key-tanstack'
import { authApi } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { path } from '../constants/path'
import { Toast } from '@/utils/toastMessage'
import { clearLS, setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/utils/storage'
import { User } from '@/models/interface/user.interface'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import { SuccessResponse } from '@/models/interface/response.interface'
import { AuthResponse } from '@/models/interface/auth.interface'
import { AxiosError, AxiosResponse } from 'axios'
import { userApi } from '@/services/user.service'
import { useTranslation } from 'react-i18next'
import { useHandleError } from '@/utils/handleErrorAPI'

// login
interface useLoginProps<TVariables> {
  mutationFn: (data: TVariables) => Promise<AxiosResponse<SuccessResponse<AuthResponse>>>
  handleError?: (error: AxiosError) => void
}
export const useLoginMutation = <TVariables>({ mutationFn, handleError }: useLoginProps<TVariables>) => {
  const { setProfile, setIsAuthenticated } = useContext(AppContext)
  const { t } = useTranslation()
  return useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: mutationFn,
    onSuccess: async ({ data }) => {
      setAccessTokenToLS(data.data.access_token as string)
      setRefreshTokenToLS(data.data.refresh_token as string)
      const dataUser = await userApi.getMe()
      setUserToLS(dataUser.data.data as User)
      setProfile(dataUser.data.data as User)
      setIsAuthenticated(true)
      Toast.success({ title: t('login_success'), description: t('login_success_description') })
    },
    onError: handleError
  })
}

// reset pass
export const useResetPWMutation = (form: UseFormReturn<any>) => {
  const { handleToastError } = useHandleError()
  const navigate = useNavigate()
  const email = form.getValues('email')
  return useMutation({
    mutationKey: ['resetPass'],
    mutationFn: () => authApi.resetPassword({ email: email }),
    onSuccess: () => {
      Toast.success({
        title: 'Thành công',
        description: `Email yêu cầu đăt lại mật khẩu đã được gửi tới ${email}, vui long kiểm tra hòm thư của bạn.`
      })
      navigate(path.login)
    },
    onError: (error) => handleToastError(error)
  })
}

// register

export const useRegisterMutation = ({ handleError }: { handleError?: (error: AxiosError) => void }) => {
  const { t } = useTranslation('message')
  const { setProfile, setIsAuthenticated } = useContext(AppContext)
  return useMutation({
    mutationKey: mutationKeys.register,
    mutationFn: authApi.register,
    onSuccess: async ({ data }) => {
      setAccessTokenToLS(data.data.access_token as string)
      setRefreshTokenToLS(data.data.refresh_token as string)
      const dataUser = await userApi.getMe()
      setUserToLS(dataUser.data.data as User)
      setProfile(dataUser.data.data as User)
      setIsAuthenticated(true)
      Toast.success({
        title: t('register_success'),
        description: t('register_success_description')
      })
    },
    onError: handleError
  })
}
export const useResetPassWMutation = ({ handleError }: { handleError?: (error: AxiosError) => void }) => {
  return useMutation({
    mutationKey: mutationKeys.register,
    mutationFn: authApi.register,
    onSuccess: () => {
      Toast.success({
        title: 'Thành công',
        description: 'Yêu cầu đặt lại mật khẩu thành công. Vui lòng kiểm tra Mail của bạn.'
      })
    },
    onError: handleError
  })
}
//logout
export const useLogoutMutation = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  return useMutation({
    mutationKey: mutationKeys.logout,
    mutationFn: authApi.logout,
    onSuccess(data: AxiosResponse<SuccessResponse<null>>) {
      Toast.success({ description: data.data.message })
      setIsAuthenticated(false)
      clearLS()
      setProfile(null)
      navigate(path.login)
    }
  })
}
