import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import UpdateUrlDialog from '@/components/UpdateUrlDialog'
import { ExtraURL, URL } from '@/models/interface/url.interface'
import ReturnValue from '@/pages/ShortenURL/ReturnValue'
import { motion, easeOut, AnimatePresence } from 'framer-motion'
import { Eye, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ManageUrlsProps {
  myUrls: ExtraURL[]
  onCheck: (_id: string) => void
  handleChangeStatus?: (_id: string, is_active: boolean) => void
  handleDelete?: (_id: string) => void
  isDeleting?: boolean
  isChangingStatus?: boolean
  isOnUpdate?: boolean
  handleUpdate?: (alias: string, url: URL) => void
  isLoading?: boolean
}
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
}

const item = {
  hidden: { opacity: 0.5, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: easeOut
    }
  },
  exit: { opacity: 0, x: 30, transition: { duration: 0.35, ease: easeOut } }
}
export default function ManageUrls({
  myUrls,
  onCheck,
  handleChangeStatus,
  handleDelete,
  handleUpdate,
  isDeleting = false,
  isChangingStatus = false,
  isOnUpdate = false,
  isLoading = false
}: ManageUrlsProps) {
  const { t } = useTranslation()
  return (
    <div className='flex-col w-full mt-4 '>
      {myUrls.length > 0 ? (
        <motion.div variants={container} initial='hidden' animate='show'>
          <AnimatePresence>
            {myUrls.map((url) => (
              <motion.div
                variants={item}
                key={url._id}
                initial={'hidden'}
                animate={'show'}
                exit={'exit'}
                className='border-b py-2 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-black/60 transition'
              >
                <div className='flex items-center gap-3 grow '>
                  <Checkbox checked={url.isCheck} onClick={() => onCheck(url._id as string)} />
                  <div className='flex flex-col'>
                    <a href={url.short_url} className=' font-medium hover:underline'>
                      {url.alias}
                    </a>
                    <span className='text-gray-500 line-clamp-1 max-w-xs md:max-w-3xl'>{url.url}</span>
                  </div>
                </div>
                {/* Các hành động */}
                <div className='flex items-center shrink-0  justify-end'>
                  <div className='p-2 duration-300 cursor-pointer text-yellow-500 hover:text-yellow-600 flex gap-1'>
                    <Eye className='size-5 md:size-6' />
                    <p className=''>{url.views}</p>
                  </div>

                  <UpdateUrlDialog url={url} isOnUpdate={isOnUpdate} onUpdate={handleUpdate} />

                  <div className='p-2 duration-300 cursor-pointer text-green-500 hover:text-green-600'>
                    <ReturnValue type='click' qr_code_link={url.qr_code} key={url._id} short_url={url.short_url} />
                  </div>
                  <div className='p-2 duration-300 cursor-pointer text-green-500 hover:text-green-600 flex items-center'>
                    <Switch
                      disabled={isChangingStatus}
                      checked={url.is_active}
                      onCheckedChange={() => handleChangeStatus?.(url._id as string, !url.is_active)}
                    />
                  </div>

                  <ConfirmDeleteDialog
                    requiredText={url.alias as string}
                    onConfirm={() => {
                      return handleDelete?.(url._id as string)
                    }}
                  >
                    <button
                      disabled={isDeleting}
                      className='p-2 duration-300 cursor-pointer text-red-500 hover:text-red-600'
                    >
                      <Trash2 className='size-5 md:size-6' />
                    </button>
                  </ConfirmDeleteDialog>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className='py-2 text-center text-gray-500'>{t('no_urls')}</div>
      )}
      {isLoading &&
        Array(8)
          .fill(0)
          .map((_, index) => {
            return <Skeleton key={index} className='h-16 w-full mt-2 rounded-md' />
          })}
    </div>
  )
}
