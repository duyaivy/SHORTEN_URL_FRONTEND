import { useChangeActiveMutation, useDeleteUrlsMutation, useQueryMyUrls, useUpdateUrlMutation } from '@/apis/url.api'
import { useUrlsQueryConfig } from '@/hooks/useUrlParams'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ManageUrls from './ManageUrls'
import PaginationPage from '@/components/PaginationPage'
import { path } from '@/constants/path'
import { ExtraURL, GetPaginationConfig, URL } from '@/models/interface/url.interface'
import { Toast } from '@/utils/toastMessage'
import ControlUrls from './ControlUrls/ControlUrls'
import { useQueryClient } from '@tanstack/react-query'
import { SuccessResponse } from '@/models/interface/response.interface'
import { AxiosResponse } from 'axios'

export default function MyURL() {
  const { t } = useTranslation(['common', 'message'])
  const queryClient = useQueryClient()
  const queryString = useUrlsQueryConfig()
  const { page, limit } = queryString
  const { data: myUrls } = useQueryMyUrls(queryString as GetPaginationConfig)
  const control = myUrls?.data.data.control

  const [extraUrls, setExtraUrls] = useState<ExtraURL[]>(() => {
    return myUrls?.data.data.data.map((item) => ({ ...item, isCheck: false })) || []
  })
  const useUpdateMutation = useUpdateUrlMutation({
    onSuccess: (data: AxiosResponse<SuccessResponse<URL>>) => {
      Toast.success({ description: t('message:update_url_success') })
      const updatedItem = data.data.data
      setExtraUrls((prev) =>
        prev.map((item) => (item._id === updatedItem._id ? { ...item, ...updatedItem, isCheck: false } : item))
      )
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      // Handle error
      Toast.error({
        description:
          error.response?.data.data[0].message || error.response?.data.message || t('message:something_went_wrong')
      })
    }
  })
  const useDeleteMutation = useDeleteUrlsMutation({
    onSuccess: () => {
      // Handle successful deletion
      Toast.success({ description: t('message:delete_url_success') })
      queryClient.invalidateQueries({ queryKey: ['myUrls', queryString] })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      // Handle error
      Toast.error({ description: error.response?.data.message || t('message:something_went_wrong') })
    }
  })
  const useChangeStatusMutation = useChangeActiveMutation({
    onSuccess: () => {
      // Handle successful deletion
      Toast.success({ description: t('message:change_status_url_success') })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      // Handle error
      Toast.error({ description: error.response?.data.message || t('message:something_went_wrong') })
      console.log(error)
    }
  })
  useEffect(() => {
    if (myUrls?.data.data.data) {
      setExtraUrls(myUrls.data.data.data.map((item) => ({ ...item, isCheck: false })))
    }
  }, [myUrls])

  const handleDeleteUrl = (_id: string) => {
    useDeleteMutation.mutate([_id])
  }

  const handleDeleteUrlsChecked = () => {
    const data = extraUrls.filter((url) => url.isCheck)
    const ids = data.map((url) => url._id as string)
    if (ids.length > 0) {
      useDeleteMutation.mutate(ids)
    }
  }
  const handleCheck = (_id?: string) => {
    setExtraUrls((prev) => {
      return prev.map((item) => (item._id === _id ? { ...item, isCheck: !item.isCheck } : item))
    })
  }
  // change status active
  const handleChangeStatus = async (_id: string, is_active: boolean) => {
    await useChangeStatusMutation.mutateAsync([
      {
        _id,
        is_active
      }
    ])
    setExtraUrls((prev) => prev.map((item) => (item._id === _id ? { ...item, is_active: !item.is_active } : item)))
  }
  const handleCheckAll = () => {
    const isAllChecked = extraUrls.every((url) => url.isCheck)
    setExtraUrls((prev) => prev.map((item) => ({ ...item, isCheck: !isAllChecked })))
  }
  const handleUpdateUrl = (alias: string, url: URL) => {
    useUpdateMutation.mutate({
      alias,
      url: {
        url: url.url as string,
        alias: url.alias as string,
        password: url.password as string,
        is_active: url.is_active as boolean
      }
    })
  }
  return (
    <div className='max-w-6xl mx-auto min-h-[70vh] '>
      <div
        className='flex flex-col justify-center px-2 items-center 
        min-w-[375px] sm:min-w-xl md:min-w-2xl xl:!min-w-6xl 
      '
      >
        {/* control */}
        <ControlUrls extraUrls={extraUrls} onCheckAll={handleCheckAll} onDeleteUrls={handleDeleteUrlsChecked} />
        <ManageUrls
          handleChangeStatus={handleChangeStatus}
          myUrls={extraUrls}
          isChangingStatus={useChangeStatusMutation.isPending}
          handleDelete={handleDeleteUrl}
          onCheck={handleCheck}
          handleUpdate={handleUpdateUrl}
          isDeleting={useDeleteMutation.isPending}
        />
      </div>
      {control && (
        <PaginationPage
          currentPage={Number(control.page)}
          total={Number(control.total)}
          queryString={{ page, limit }}
          path={path.my_url}
        />
      )}
    </div>
  )
}
