import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { useTranslation } from 'react-i18next'
import { ExtraQrHistory } from '@/models/interface/url.interface'
import { Copy, ExternalLink, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'
import { Toast } from '@/utils/toastMessage'
import { DATETIME_FORMAT } from '@/constants/common.const'
import { AnimatePresence, motion } from 'framer-motion'
import { container, item } from '@/constants/motion.const'
interface ManageQrProps {
  myHistories: ExtraQrHistory[]
  onCheck: (_id: string) => void
  handleDelete?: (_id: string) => void
  isDeleting?: boolean
  isLoading?: boolean
}

export default function ManageQr({
  myHistories,
  onCheck,
  handleDelete,
  isDeleting = false,
  isLoading = false
}: ManageQrProps) {
  const { t } = useTranslation()
  const handleCopy = (text?: string) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    Toast.success({ description: t('copy_success') })
  }
  return (
    <div className='flex-col w-full mt-4'>
      {myHistories.length > 0 ? (
        <motion.div variants={container} initial='hidden' animate='show'>
          <AnimatePresence>
            {myHistories.map((history) => {
              const date = dayjs(history.date).format(DATETIME_FORMAT)
              return (
                <motion.div
                  variants={item}
                  initial={'hidden'}
                  animate={'show'}
                  exit={'exit'}
                  key={history._id}
                  className='border-b py-2 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-black/60 transition'
                >
                  <div className='flex items-center gap-3 grow'>
                    <Checkbox checked={history.isCheck} onClick={() => onCheck(history._id as string)} />
                    <div className='flex flex-col'>
                      <a href={history.decoded} target='_blank' className='hover:underline'>
                        <span className='font-medium'>{date}</span>
                      </a>

                      <span className='text-gray-500 text-sm'>{history.decoded ?? t('no_alias')}</span>
                    </div>
                  </div>

                  <div className='flex items-center shrink-0 justify-end'>
                    <a
                      href={history.decoded}
                      target='_blank'
                      className='p-2 duration-300 cursor-pointer text-green-500 hover:text-green-600 flex items-center'
                    >
                      <ExternalLink className='size-5 md:size-6' />
                    </a>
                    <div
                      className='p-2 duration-300 cursor-pointer text-blue-500 hover:text-blue-600 flex items-center'
                      onClick={() => handleCopy(history.decoded)}
                    >
                      <Copy className='size-5 md:size-6' />
                    </div>
                    <ConfirmDeleteDialog
                      requiredText={t('delete')}
                      onConfirm={() => {
                        console.log(history._id)

                        handleDelete?.(history._id as string)
                      }}
                    >
                      <button
                        className='p-2 duration-300 cursor-pointer text-red-500 hover:text-red-600 flex items-center'
                        disabled={isDeleting}
                      >
                        <Trash2 className='size-5 md:size-6' />
                      </button>
                    </ConfirmDeleteDialog>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className='py-2 text-center text-gray-500'>{t('no_urls')}</div>
      )}

      {isLoading &&
        Array(8)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className='h-16 w-full mt-2 rounded-md' />)}
    </div>
  )
}
