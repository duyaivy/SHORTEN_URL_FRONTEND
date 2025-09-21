import { trash } from '@/assets/icons'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Lottie from 'react-lottie-player'

export default function MyURL() {
  const { t } = useTranslation()
  return (
    <div className='max-w-6xl mx-auto min-h-[70vh] '>
      <div
        className='flex flex-col justify-center  items-center min-w-sm  md:min-w-2xl xl:!min-w-6xl 
      '
      >
        {/* control */}
        <div className='flex flex-col md:flex-row w-full md:items-center justify-between items-start'>
          <div className='flex gap-2 md:gap-4 justify-start flex-1 items-center'>
            <div className='border rounded-md border-main text-lg p-2'>{t('total_views')} 99</div>
            <Checkbox className='size-6 m-1' />
            <Lottie className='size-10 mb-2' animationData={trash} />
          </div>
          <div className='w-full md:w-auto  mt-2 md:mt-0'>
            <Input type='text' placeholder={t('search')} className='flex-1 w-full' icon={<Search />} />
          </div>
        </div>
        <div className='flex-col w-full'>
          <div className='flex '></div>
        </div>
      </div>
    </div>
  )
}
