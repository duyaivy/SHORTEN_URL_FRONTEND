import { mutationKeys } from '@/helpers/key-tanstack'
import { authApi } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { UseFormReturn } from 'react-hook-form'
import { Toast } from '@/utils/toastMessage'
import { clearLS, setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/utils/storage'
import { User } from '@/models/interface/user.interface'
import { Dispatch, SetStateAction, useContext } from 'react'
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
  const { t } = useTranslation('message')
  return useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: mutationFn,
    onSuccess: async ({ data }) => {
      setIsAuthenticated(true)
      setAccessTokenToLS(data.data.access_token as string)
      setRefreshTokenToLS(data.data.refresh_token as string)
      const dataUser = await userApi.getMe()
      setUserToLS(dataUser.data.data as User)
      setProfile(dataUser.data.data as User)

      Toast.success({ title: t('login_success'), description: t('login_success_description') })
    },
    onError: handleError
  })
}
// forgot password
export const useForgotOrResetPWMutation = (
  form: UseFormReturn<any>,
  isForgotPW: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  token?: string
) => {
  const { handleErrorAPI } = useHandleError()
  const { t } = useTranslation('message')
  const { email, password } = form.getValues()
  return useMutation({
    mutationKey: isForgotPW ? mutationKeys.forgotPW : mutationKeys.resetPW,
    mutationFn: isForgotPW
      ? () => authApi.forgotPassword({ email: email })
      : () => authApi.resetPassword({ password, token: token as string }),
    onSuccess: () => {
      Toast.success({
        description: isForgotPW ? t('forgot_password_success', { email }) : t('reset_password_success')
      })
      form.reset()
      setOpen(false)
    },
    onError: (error) => handleErrorAPI(error, form)
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

//logout
export const useLogoutMutation = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  return useMutation({
    mutationKey: mutationKeys.logout,
    mutationFn: authApi.logout,
    onSuccess(data: AxiosResponse<SuccessResponse<null>>) {
      Toast.success({ description: data.data.message })
      setIsAuthenticated(false)
      clearLS()
      setProfile(null)
    }
  })
}
