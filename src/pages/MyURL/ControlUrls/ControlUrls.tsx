import { trash } from '@/assets/icons'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useManageUrlStore } from '@/stores/manageUrl.store'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Lottie from 'react-lottie-player'
interface ControlUrlsProps {
  onDeleteUrls?: () => void
  isLoading?: boolean
}
export default function ControlUrls({ onDeleteUrls, isLoading }: ControlUrlsProps) {
  const { t } = useTranslation()
  const { isAllChecked, getCheckedCount, getTotalViews, handleCheckAll } = useManageUrlStore()

  return (
    <div className='flex flex-col md:flex-row w-full md:items-center justify-between items-start'>
      {isLoading ? (
        <>
          <Skeleton className='h-15 w-40 my-1' />
          <Skeleton className='h-15 w-64  my-1' />
        </>
      ) : (
        <>
          <div className='flex gap-2 md:gap-4 justify-start flex-1 items-center'>
            <div className='border rounded-md border-main text-lg p-2'>
              {t('total_views')} {getTotalViews()}
            </div>
            <Checkbox checked={isAllChecked()} onClick={handleCheckAll} className='size-6 m-1' />
            {getCheckedCount() > 0 && (
              <button type='button' onClick={onDeleteUrls} className='cursor-pointer'>
                <Lottie className='size-10 mb-2' animationData={trash} />
              </button>
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
