import { useChangeActiveMutation, useDeleteUrlsMutation, useQueryMyUrls, useUpdateUrlMutation } from '@/apis/url.api'
import { useUrlsQueryConfig } from '@/hooks/useUrlParams'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ManageUrls from './ManageUrls'
import PaginationPage from '@/components/PaginationPage'
import { path } from '@/constants/path'
import { GetPaginationConfig, URL } from '@/models/interface/url.interface'
import { Toast } from '@/utils/toastMessage'
import ControlUrls from './ControlUrls/ControlUrls'
import { useQueryClient } from '@tanstack/react-query'
import { SuccessResponse } from '@/models/interface/response.interface'
import { AxiosResponse } from 'axios'
import { queryKeys } from '@/helpers/key-tanstack'
import { useManageUrlStore } from '@/stores/manageUrl.store'

export default function MyURL() {
  const { t } = useTranslation(['common', 'message'])
  const queryClient = useQueryClient()
  const queryString = useUrlsQueryConfig()
  const { page, limit } = queryString
  const { data: myUrls, isLoading } = useQueryMyUrls(queryString as GetPaginationConfig)
  const control = myUrls?.data.data.control

  // Zustand store
  const { setExtraUrl, setIsDeleting, setIsUpdating, setIsChangingStatus, getCheckedIds, updateUrlStatus, updateUrl } =
    useManageUrlStore()

  // Mutations
  const useUpdateMutation = useUpdateUrlMutation({
    onSuccess: (data: AxiosResponse<SuccessResponse<URL>>) => {
      Toast.success({ description: t('message:update_url_success') })
      const updatedItem = data.data.data
      updateUrl(updatedItem._id as string, updatedItem)
      setIsUpdating(false)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      Toast.error({
        description:
          error.response?.data.data[0].message || error.response?.data.message || t('message:something_went_wrong')
      })
      setIsUpdating(false)
    }
  })

  const useDeleteMutation = useDeleteUrlsMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.myUrls, queryString] })
      setIsDeleting(false)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      Toast.error({ description: error.response?.data.message || t('message:something_went_wrong') })
      setIsDeleting(false)
    }
  })

  const useChangeStatusMutation = useChangeActiveMutation({
    onSuccess: () => {
      setIsChangingStatus(false)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      Toast.error({ description: error.response?.data.message || t('message:something_went_wrong') })
      setIsChangingStatus(false)
    }
  })

  // Sync data from API to store
  useEffect(() => {
    if (myUrls?.data.data.data) {
      setExtraUrl(myUrls.data.data.data.map((item) => ({ ...item, isCheck: false })))
    }
  }, [myUrls, setExtraUrl])

  // Handlers that call mutations
  const handleDeleteUrl = (_id: string) => {
    setIsDeleting(true)
    useDeleteMutation.mutate([_id])
  }

  const handleDeleteUrlsChecked = () => {
    const ids = getCheckedIds()
    if (ids.length > 0) {
      setIsDeleting(true)
      useDeleteMutation.mutate(ids)
    }
  }

  const handleChangeStatus = async (_id: string, is_active: boolean) => {
    setIsChangingStatus(true)
    await useChangeStatusMutation.mutateAsync([{ _id, is_active }])
    updateUrlStatus(_id, is_active)
  }

  const handleUpdateUrl = (alias: string, url: URL) => {
    setIsUpdating(true)
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
        min-w-2sm sm:min-w-xl md:min-w-2xl xl:!min-w-6xl 
      '
      >
        {/* control */}
        <ControlUrls isLoading={isLoading} onDeleteUrls={handleDeleteUrlsChecked} />
        <ManageUrls
          isLoading={isLoading}
          handleChangeStatus={handleChangeStatus}
          handleDelete={handleDeleteUrl}
          handleUpdate={handleUpdateUrl}
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
