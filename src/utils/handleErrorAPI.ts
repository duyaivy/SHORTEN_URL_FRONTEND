import { AxiosError, isAxiosError } from 'axios'
import { UseFormReturn, Path, FieldValues } from 'react-hook-form'
import { FailResponse } from '@/models/interface/response.interface'
import isEqual from 'lodash/isEqual'
import HttpStatusCode from '@/constants/http'
import { Toast } from './toastMessage'

export const isError422 = <T>(error: AxiosError): error is AxiosError<FailResponse<T>> => {
  if (isEqual(error.status, HttpStatusCode.UnprocessableEntity)) {
    return true
  }
  return false
}

export const handleErrorAPI = <T extends FieldValues>(error: unknown, form?: UseFormReturn<T>) => {
  {
    if (isAxiosError(error)) {
      if (isError422<FailResponse<null>>(error as AxiosError)) {
        const err: FailResponse<null> = error.response?.data
        form?.setError('password' as Path<T>, {
          message: err.message,
          type: 'Server'
        })
      } else {
        Toast.error({
          title: 'Có lỗi xảy ra',
          description: error.response?.data.message || 'Thực hiện thất bại, vui lòng thử lại sau.'
        })
      }
    } else {
      Toast.error({ title: 'Có lỗi xảy ra', description: 'Lỗi không xác định.' })
    }
  }
}
export const handleToastError = (error: unknown) => {
  {
    if (isAxiosError(error)) {
      Toast.error({ description: error.response?.data.message })
    } else {
      Toast.error({ title: 'Có lỗi xảy ra', description: 'Lỗi không xác định.' })
    }
  }
}
interface handleError422Prams<T extends FieldValues> {
  error: unknown
  form?: UseFormReturn<T>
  fieldName?: Path<T>
}
export const handleError422 = <T extends FieldValues>({ error, form, fieldName }: handleError422Prams<T>) => {
  console.log(error)

  if (isAxiosError(error)) {
    if (isError422<FailResponse<null>>(error as AxiosError)) {
      const err: FailResponse<null> = error.response?.data
      if (fieldName) {
        form?.setError(fieldName, {
          message: err.message,
          type: 'Server'
        })
      } else {
        Toast.error({
          title: 'Có lỗi xảy ra',
          description: err.message || 'Thực hiện thất bại, vui lòng thử lại sau.'
        })
      }
    } else {
      Toast.error({
        title: 'Có lỗi xảy ra',
        description: error.response?.data.message || 'Thực hiện thất bại, vui lòng thử lại sau.'
      })
    }
  } else {
    Toast.error({
      title: 'Có lỗi xảy ra',
      description: 'Lỗi không xác định.'
    })
  }
}
