// import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
// import { mutationKeys } from '../helpers/key-tanstack'
// import { BookingListConfig, BookingUpdateRequest, DataBookingAPI } from '@/models/interface/booking.interface'
// import { bookingApi } from '../services/booking.service'

// import { Toast } from '@/utils/toastMessage'
// import { handleToastError } from '@/utils/handleErrorAPI'
// import { path } from '../constants/path'
// import { productApi } from '../services/products.service'
// import { Product, ProductListConfig } from '@/models/interface/product.interface'
// import { QueryPrdConfig } from '@/hooks/usePrdQueryConfig'
// import { categoryApi } from '../services/category.service'
// import { Category, CategoryListConfig } from '@/models/interface/category.interface'
// import { SuccessResponse } from '@/models/interface/response.interface'
// import { AxiosResponse } from 'axios'
// import { QueryCateConfig } from '@/hooks/useCateQueryConfig'
// import { STATE_TIME } from '@/configs/consts'
// import { BookingQueryConfig } from '@/hooks/useBookingQueryConfig'

// //product
// export const useProductQuery = ({ queryString }: { queryString: QueryPrdConfig }) => {
//   return useQuery({
//     queryKey: [path.products, queryString],
//     queryFn: () => productApi.get(queryString as ProductListConfig),
//     placeholderData: keepPreviousData,
//     staleTime: STATE_TIME
//   })
// }
// export const usePrdDetailQuery = ({ id }: { id: number }) =>
//   useQuery({
//     queryKey: [path.product, id],
//     queryFn: () => productApi.getPrdDetail(id),
//     staleTime: STATE_TIME
//   })
// export const useProductDelete = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationKey: mutationKeys.delPrd,
//     mutationFn: productApi.delete,
//     onSuccess: (data: AxiosResponse<SuccessResponse<null>>) => {
//       const message = data?.data?.message
//       Toast.success({ description: message })
//       queryClient.invalidateQueries({ queryKey: [path.products] })
//     },
//     onError: (error) => handleToastError(error)
//   })
// }

// interface usePrdProps<TVariables> {
//   mutationFn: (data: TVariables) => Promise<AxiosResponse<SuccessResponse<Product>>>
//   handleError?: (error: unknown) => void
// }
// export const usePrdMutation = <TVariables>({ mutationFn, handleError }: usePrdProps<TVariables>) => {
//   return useMutation({
//     mutationKey: mutationKeys.changeCategory,
//     mutationFn: mutationFn,
//     onSuccess: (data: AxiosResponse<SuccessResponse<Product>>) => {
//       const message = data?.data?.message
//       Toast.success({ description: message })
//     },
//     onError: (error) => handleError && handleError(error)
//   })
// }
// //category
// export const useCategoryQuery = ({ queryString }: { queryString?: QueryCateConfig }) =>
//   useQuery({
//     queryKey: [path.admin.manage.category, queryString],
//     queryFn: () => categoryApi.query(queryString as CategoryListConfig),
//     placeholderData: keepPreviousData,
//     staleTime: STATE_TIME
//   })

// export const useCategoryIdQuery = (id: number) =>
//   useQuery({
//     queryKey: [path.admin.manage.category, id],
//     queryFn: () => categoryApi.getById(id)
//   })
// export const useCategoryDelete = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationKey: mutationKeys.changePrd,
//     mutationFn: categoryApi.delete,
//     onSuccess: (data: AxiosResponse<SuccessResponse<null>>) => {
//       const message = data?.data?.message
//       Toast.success({ description: message })
//       queryClient.invalidateQueries({ queryKey: [path.admin.manage.category] })
//     },
//     onError: (error) => handleToastError(error)
//   })
// }

// interface useCategoryProps<TVariables> {
//   mutationFn: (data: TVariables) => Promise<AxiosResponse<SuccessResponse<Category>>>
//   handleError?: (error: unknown) => void
// }
// export const useCategoryMutation = <TVariables>({ mutationFn, handleError }: useCategoryProps<TVariables>) => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationKey: mutationKeys.changeCategory,
//     mutationFn: mutationFn,
//     onSuccess: (data: AxiosResponse<SuccessResponse<Category>>) => {
//       const message = data?.data?.message
//       Toast.success({ description: message })
//       queryClient.invalidateQueries({ queryKey: [path.admin.manage.category] })
//     },
//     onError: (error) => handleError && handleError(error)
//   })
// }

// // review

// // booking
// export const useBookingQuery = ({ queryString }: { queryString: BookingQueryConfig }) => {
//   return useQuery({
//     queryKey: [path.admin.booking, queryString],
//     queryFn: () => bookingApi.query(queryString as BookingListConfig),
//     placeholderData: keepPreviousData,
//     staleTime: STATE_TIME
//   })
// }
// export const useUserBookingQuery = ({ queryString }: { queryString: BookingQueryConfig }) => {
//   return useQuery({
//     queryKey: [path.user.history, queryString],
//     queryFn: () => bookingApi.query(queryString as BookingListConfig),
//     placeholderData: keepPreviousData,
//     staleTime: STATE_TIME
//   })
// }
// export const useBookingMutation = () => {
//   return useMutation({
//     mutationKey: mutationKeys.booking,
//     mutationFn: (data: DataBookingAPI) => {
//       const { dataAPI, isLogin } = data
//       return bookingApi.post(dataAPI, isLogin)
//     },
//     onSuccess: () => {
//       Toast.success({
//         title: 'Thành công',
//         description: 'Đặt dịch vụ thành công. Chúng tôi sẽ tư vấn trong thời gian sớm nhất.'
//       })
//     },
//     onError: (error) => handleToastError(error)
//   })
// }
// export const useUpdateBookingMutation = () => {
//   return useMutation({
//     mutationKey: mutationKeys.booking,
//     mutationFn: (data: BookingUpdateRequest) => {
//       return bookingApi.edit(data)
//     },
//     onSuccess: () => {
//       Toast.success({
//         title: 'Thành công',
//         description: 'Cập nhật đơn đặt hàng thành công.'
//       })
//     },
//     onError: (error) => handleToastError(error)
//   })
// }
// interface UpdateSttBookingProps {
//   successMessage?: string
// }
// export const useUpdateSttBookingMutation = ({ successMessage }: UpdateSttBookingProps) => {
//   return useMutation({
//     mutationKey: mutationKeys.booking,
//     mutationFn: (data: BookingUpdateRequest) => {
//       return bookingApi.updateStatus(data)
//     },
//     onSuccess: () => {
//       Toast.success({
//         title: 'Thành công',
//         description: successMessage
//       })
//     },
//     onError: (error) => handleToastError(error)
//   })
// }
