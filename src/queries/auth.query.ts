import { mutationKeys } from '@/helpers/key-tanstack'
import { authApi } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { path } from '../constants/path'
import { handleErrorAPI, handleToastError } from '@/utils/handleErrorAPI'
import { Toast } from '@/utils/toastMessage'
import { clearLS, setAccessTokenToLS, setRefreshTokenToLS, setUserToLS } from '@/utils/storage'
import { User } from '@/models/interface/user.interface'
import { useContext } from 'react'
import { AppContext } from '../contexts/app.context'
import { SuccessResponse } from '@/models/interface/response.interface'
import { LoginResponse } from '@/models/interface/auth.interface'
import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

// login
interface useLoginProps<TVariables> {
  mutationFn: (data: TVariables) => Promise<AxiosResponse<SuccessResponse<LoginResponse>>>
  handleError?: (error: AxiosError) => void
}
export const useLoginMutation = <TVariables>({ mutationFn, handleError }: useLoginProps<TVariables>) => {
  const { setProfile, setIsAuthenticated } = useContext(AppContext)

  return useMutation({
    mutationKey: mutationKeys.login,
    mutationFn: mutationFn,
    onSuccess: ({ data }) => {
      setAccessTokenToLS(data.data.accessToken as string)
      setRefreshTokenToLS(data.data.refreshToken as string)
      setUserToLS(data.data.user as User)
      setIsAuthenticated(true)
      setProfile(data.data.user as User)
      Toast.success({ title: 'Thành công', description: 'Đăng nhập thành công 🚀⚡' })
    },
    onError: handleError
  })
}

//re-sent email
export const useSentMailMutation = (form: UseFormReturn<any>) => {
  const navigate = useNavigate()
  const email = form.getValues('email')
  return useMutation({
    mutationKey: ['sentEmail'],
    mutationFn: () => authApi.sentEmailAuth({ email: email }),
    onSuccess: () => {
      Toast.success({
        title: 'Thành công vui lòng xác thực email.',
        description: `Email xác nhận đã được gửi tới ${email}, vui lòng kiểm tra Spam hoặc Thư rác.`
      })
      navigate(path.login)
    },
    onError: (error) => handleErrorAPI(error, form)
  })
}

// reset pass
export const useResetPWMutation = (form: UseFormReturn<any>) => {
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

export const useResetPWSaleMutation = () => {
  return useMutation({
    mutationKey: ['resetPassSale'],
    mutationFn: async ({ email }: { email?: string }) => {
      return await toast.promise(authApi.resetPassword({ email }), {
        loading: 'Đang gửi email đặt lại mật khẩu.',
        success: (data) => `Email đã được gửi đến ${data.data.data.email}`,
        error: 'Có lỗi trong quá trình gửi email.'
      })
    }
  })
}

// register

export const useRegisterMutation = ({ handleError }: { handleError?: (error: AxiosError) => void }) => {
  return useMutation({
    mutationKey: mutationKeys.register,
    mutationFn: authApi.register,
    onSuccess: () => {
      Toast.success({
        title: 'Thành công',
        description: 'Đăng kí tài khoản thành công. Vui lòng kiểm tra Mail của bạn.'
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
