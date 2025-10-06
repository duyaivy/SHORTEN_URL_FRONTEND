import { useDeleteQrHistoryMutation, useQueryQrHistory } from '@/apis/url.api'
import { useUrlsQueryConfig } from '@/hooks/useUrlParams'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import PaginationPage from '@/components/PaginationPage'
import { path } from '@/constants/path'
import { ExtraQrHistory, GetPaginationConfig } from '@/models/interface/url.interface'
import { Toast } from '@/utils/toastMessage'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/helpers/key-tanstack'
import ControlQr from './ControlQr'
import ManageQr from './ManageQr'

export default function HistoryQr() {
  const { t } = useTranslation(['common', 'message'])
  const queryClient = useQueryClient()
  const queryString = useUrlsQueryConfig()
  const { page, limit } = queryString
  const { data: myQrHistories, isLoading } = useQueryQrHistory(queryString as GetPaginationConfig)
  const control = myQrHistories?.data.data.control

  const [extraHistories, setExtraHistories] = useState<ExtraQrHistory[]>(() => {
    return myQrHistories?.data.data.data.map((item) => ({ ...item, isCheck: false })) || []
  })

  const useDeleteMutation = useDeleteQrHistoryMutation({
    onSuccess: () => {
      // Handle successful deletion
      Toast.success({ description: t('message:delete_qr_history_success') })
      queryClient.invalidateQueries({ queryKey: [queryKeys.qrHistory, queryString] })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      // Handle error
      Toast.error({ description: error.response?.data.message || t('message:something_went_wrong') })
    }
  })
  useEffect(() => {
    if (myQrHistories?.data.data.data) {
      setExtraHistories(myQrHistories.data.data.data.map((item) => ({ ...item, isCheck: false })))
    }
  }, [myQrHistories])
  const handleDelete = (id?: string) => {
    if (id) {
      useDeleteMutation.mutate([id])
    }
  }
  const handleDeleteHistories = () => {
    const data = extraHistories.filter((qr) => qr.isCheck)
    const ids = data.map((qr) => qr._id as string)
    if (ids.length > 0) {
      useDeleteMutation.mutate(ids)
    }
  }
  const handleCheck = (_id?: string) => {
    setExtraHistories((prev) => {
      return prev.map((item) => (item._id === _id ? { ...item, isCheck: !item.isCheck } : item))
    })
  }

  const handleCheckAll = () => {
    const isAllChecked = extraHistories.every((qr) => qr.isCheck)
    setExtraHistories((prev) => prev.map((item) => ({ ...item, isCheck: !isAllChecked })))
  }

  return (
    <div className='max-w-6xl mx-auto min-h-[70vh] '>
      <div
        className='flex flex-col justify-center px-2 items-center 
        min-w-2sm sm:min-w-xl md:min-w-2xl xl:!min-w-6xl 
      '
      >
        {/* control */}
        <ControlQr
          isLoading={isLoading}
          extraHistories={extraHistories}
          onCheckAll={handleCheckAll}
          onDeleteHistories={handleDeleteHistories}
        />
        <ManageQr
          isLoading={isLoading}
          myHistories={extraHistories}
          onCheck={handleCheck}
          handleDelete={handleDelete}
          isDeleting={useDeleteMutation.isPending}
        />
      </div>
      {control && (
        <PaginationPage
          currentPage={Number(control.page)}
          total={Number(control.total)}
          queryString={{ page, limit }}
          path={path.history}
        />
      )}
    </div>
  )
}
