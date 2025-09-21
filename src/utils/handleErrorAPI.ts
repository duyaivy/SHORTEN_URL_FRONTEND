import { AxiosError, isAxiosError } from 'axios'
import { UseFormReturn, Path, FieldValues } from 'react-hook-form'
import { FailResponse } from '@/models/interface/response.interface'
import isEqual from 'lodash/isEqual'
import HttpStatusCode from '@/constants/http'
import { Toast } from './toastMessage'
import { AuthErrorValidate } from '@/models/interface/auth.interface'
import { useTranslation } from 'react-i18next'

export const useHandleError = () => {
  const { t } = useTranslation('message')
  const isError422 = <T>(error: AxiosError): error is AxiosError<FailResponse<T>> => {
    if (isEqual(error.status, HttpStatusCode.UnprocessableEntity)) {
      return true
    }
    return false
  }

  const handleErrorAPI = <T extends FieldValues>(error: unknown, form?: UseFormReturn<T>) => {
    {
      if (isAxiosError(error)) {
        if (isError422<FailResponse<null>>(error as AxiosError)) {
          const err: FailResponse<AuthErrorValidate[]> = error.response?.data
          err?.data?.forEach((item) => {
            const field = item.field?.split('.')[1] as Path<T>
            form?.setError(field, {
              message: item.message,
              type: 'Server'
            })
          })
        } else {
          Toast.error({
            title: t('error_occurred'),
            description: error.response?.data?.message || t('something_went_wrong')
          })
        }
      } else {
        Toast.error({ title: t('error_occurred'), description: t('unknown_error') })
      }
    }
  }
  const handleToastError = (error: unknown) => {
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
  const handleError422 = <T extends FieldValues>({ error, form, fieldName }: handleError422Prams<T>) => {
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
  return { handleErrorAPI, handleToastError, handleError422 }
}
