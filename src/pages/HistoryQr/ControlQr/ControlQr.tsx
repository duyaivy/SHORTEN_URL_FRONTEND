import { trash } from '@/assets/icons'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useManageHistoryScan } from '@/stores/qr-history.store'
import { Search } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Lottie from 'react-lottie-player'
interface ControlQrProps {
  onDeleteHistories?: () => void
  isLoading?: boolean
}
export default function ControlQr({ onDeleteHistories, isLoading }: ControlQrProps) {
  const { t } = useTranslation()
  const { extraHistory, handleCheckAll } = useManageHistoryScan()
  const isAllChecked = useMemo(() => {
    return extraHistory.every((url) => url.isCheck) && extraHistory.length > 0
  }, [extraHistory])
  const countChecked = useMemo(() => {
    return extraHistory.filter((url) => url.isCheck).length
  }, [extraHistory])
  return (
    <div className='flex flex-col md:flex-row w-full md:items-center justify-between items-start'>
      {isLoading ? (
        <>
          <Skeleton className='h-15 w-40' />
          <Skeleton className='h-15 w-64' />
        </>
      ) : (
        <>
          <div className='flex gap-2 md:gap-4 justify-start flex-1 items-center'>
            <div className='border rounded-md border-main text-lg p-2'>
              {t('total')} {extraHistory.length}
            </div>
            <Checkbox checked={isAllChecked} onClick={handleCheckAll} className='size-6 m-1' />
            {countChecked > 0 && (
              <ConfirmDeleteDialog
                requiredText={t('require_text_all', { count: countChecked })}
                onConfirm={onDeleteHistories}
              >
                <Lottie className='size-10 mb-2 cursor-pointer ' animationData={trash} />
              </ConfirmDeleteDialog>
            )}
          </div>
          <div className='md:w-auto mt-2 w-full md:mt-0'>
            <Input type='text' placeholder={t('search')} className='flex-1 w-full md:w-auto' icon={<Search />} />
          </div>
        </>
      )}
    </div>
  )
}
