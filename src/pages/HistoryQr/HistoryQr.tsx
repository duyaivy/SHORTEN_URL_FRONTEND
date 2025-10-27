import { useDeleteQrHistoryMutation, useQueryQrHistory } from '@/apis/url.api'
import { useUrlsQueryConfig } from '@/hooks/useUrlParams'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import PaginationPage from '@/components/PaginationPage'
import { path } from '@/constants/path'
import { GetPaginationConfig } from '@/models/interface/url.interface'
import { Toast } from '@/utils/toastMessage'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/helpers/key-tanstack'
import ControlQr from './ControlQr'
import ManageQr from './ManageQr'
import { useManageHistoryScan } from '@/stores/qr-history.store'

export default function HistoryQr() {
  const { t } = useTranslation(['common', 'message'])
  const { setIsDeleting, extraHistory, setExtraHistory } = useManageHistoryScan()
  const queryClient = useQueryClient()
  const queryString = useUrlsQueryConfig()
  const { page, limit } = queryString
  const { data: myQrHistories, isLoading } = useQueryQrHistory(queryString as GetPaginationConfig)
  const control = myQrHistories?.data.data.control

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
    },
    onSettled: () => {
      setIsDeleting(false)
    }
  })
  useEffect(() => {
    if (myQrHistories?.data.data.data) {
      setExtraHistory(myQrHistories.data.data.data.map((item) => ({ ...item, isCheck: false })))
    }
  }, [myQrHistories, setExtraHistory])
  const handleDelete = (id?: string) => {
    if (id) {
      setIsDeleting(true)
      useDeleteMutation.mutate([id])
    }
  }
  const handleDeleteHistories = () => {
    setIsDeleting(true)
    const data = extraHistory.filter((qr) => qr.isCheck)
    const ids = data.map((qr) => qr._id as string)
    if (ids.length > 0) {
      useDeleteMutation.mutate(ids)
    }
  }

  return (
    <div className='max-w-6xl mx-auto min-h-[70vh] '>
      <div
        className='flex flex-col justify-center px-2 items-center 
        min-w-2sm sm:min-w-xl md:min-w-2xl xl:!min-w-6xl 
      '
      >
        {/* control */}
        <ControlQr onDeleteHistories={handleDeleteHistories} isLoading={isLoading} />
        <ManageQr handleDelete={handleDelete} isLoading={isLoading} />
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
