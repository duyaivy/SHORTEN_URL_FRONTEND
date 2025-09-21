// import { mutationKeys } from '@/helpers/key-tanstack'
// import { userApi } from '@/services/user.service'
// import { handleToastError } from '@/utils/handleErrorAPI'
// import { Toast } from '@/utils/toastMessage'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { AppContext } from '@/contexts/app.context'
import { User } from '@/models/interface/user.interface'
import { userApi } from '@/services/user.service'
import { useHandleError } from '@/utils/handleErrorAPI'
import { setUserToLS } from '@/utils/storage'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

// import { keepPreviousData } from '@tanstack/react-query'
// import { path } from '../constants/path'
// import { User, UserListConfig } from '@/models/interface/user.interface'
// import { QueryUserConfig } from '@/hooks/useUserQueryConfig'
// import { STATE_TIME } from '@/configs/consts'
// import { AxiosError } from 'axios'
// import { useContext } from 'react'
// import { AppContext } from '../contexts/app.context'
// import { setUserToLS } from '@/utils/storage'

// interface UserQueryProps {
//   queryString: QueryUserConfig
// }
// export const useUserQuery = ({ queryString }: UserQueryProps) => {
//   return useQuery({
//     queryKey: [path.admin.manage.user, queryString],
//     queryFn: () => userApi.get(queryString as UserListConfig),
//     placeholderData: keepPreviousData,
//     staleTime: STATE_TIME
//   })
// }
// interface UpdateUserMutationProps {
//   handleError?: (error: AxiosError) => void
// }
// export const useUpdateUserMutation = ({ handleError }: UpdateUserMutationProps) => {
//   const queryClient = useQueryClient()
//   const { setProfile } = useContext(AppContext)
//   return useMutation({
//     mutationKey: mutationKeys.updateProfile,
//     mutationFn: userApi.update,
//     onSuccess: (data) => {
//       Toast.success({ description: 'Cập nhật thông tin thành công.' })
//       queryClient.invalidateQueries({ queryKey: [path.admin.manage.user] })
//       setProfile(data?.data?.data)
//     },
//     onError: handleError
//   })
// }
// export const useAddRoleMutation = ({ handleError }: UpdateUserMutationProps) => {
//   return useMutation({
//     mutationKey: mutationKeys.updateProfile,
//     mutationFn: userApi.addRole,
//     onSuccess: () => {
//       Toast.success({ description: 'Thêm vai trò người dùng thành công.' })
//     },
//     onError: handleError
//   })
// }
// export const useAddSaleMutation = ({ handleError }: { handleError?: (error: AxiosError) => void }) => {
//   return useMutation({
//     mutationKey: mutationKeys.register,
//     mutationFn: userApi.add,
//     onSuccess: () => {
//       Toast.success({
//         title: 'Thành công',
//         description: 'Đăng kí tài khoản cho nhân viên thành công.'
//       })
//     },
//     onError: handleError
//   })
// }
// export const useUserDelete = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (id: number) => userApi.delete(id),
//     onSuccess: () => {
//       Toast.success({ description: 'Xóa người dùng thành công' })
//       queryClient.invalidateQueries({ queryKey: [path.admin.manage.user] })
//     },
//     onError: (error) => {
//       handleToastError(error)
//     }
//   })
// }
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
