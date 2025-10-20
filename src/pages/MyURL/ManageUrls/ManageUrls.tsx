import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import UpdateUrlDialog from '@/components/UpdateUrlDialog'
import { container, item } from '@/constants/motion.const'
import { ExtraURL, URL } from '@/models/interface/url.interface'
import ReturnValue from '@/pages/ShortenURL/ReturnValue'
import { motion } from 'framer-motion'
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
        <motion.div variants={container} initial='hidden' animate='show' className='flex flex-col w-full mt-4'>
          {myUrls.length > 0 ? (
            myUrls.map((url) => (
              <motion.div
                key={url._id}
                variants={item}
                className='border-b py-2 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-black/60 transition'
              >
                <div className='flex items-center gap-3 grow'>
                  <Checkbox checked={url.isCheck} onClick={() => onCheck(url._id as string)} />
                  <div className='flex flex-col'>
                    <a href={url.short_url} className='font-medium hover:underline'>
                      {url.alias}
                    </a>
                    <span className='text-gray-500 line-clamp-1 max-w-xs md:max-w-3xl'>{url.url}</span>
                  </div>
                </div>

                <div className='flex items-center shrink-0 justify-end'>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <div className='p-2 text-yellow-500 hover:text-yellow-600 flex gap-1 cursor-pointer duration-300'>
                          <Eye className='size-5 md:size-6' />
                          <p>{url.views}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('view')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <UpdateUrlDialog url={url} isOnUpdate={isOnUpdate} onUpdate={handleUpdate} />

                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <div className='p-2 text-green-500 hover:text-green-600 cursor-pointer duration-300'>
                          <ReturnValue
                            type='click'
                            qr_code_link={url.qr_code}
                            key={url._id}
                            short_url={url.short_url}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('qr_code')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <div className='p-2 text-green-500 hover:text-green-600 flex items-center cursor-pointer duration-300'>
                          <Switch
                            disabled={isChangingStatus}
                            checked={url.is_active}
                            onCheckedChange={() => handleChangeStatus?.(url._id as string, !url.is_active)}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('status')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <ConfirmDeleteDialog
                          requiredText={url.alias as string}
                          onConfirm={() => handleDelete?.(url._id as string)}
                        >
                          <button
                            disabled={isDeleting}
                            className='p-2 text-red-500 hover:text-red-600 cursor-pointer duration-300'
                          >
                            <Trash2 className='size-5 md:size-6' />
                          </button>
                        </ConfirmDeleteDialog>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('delete')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </motion.div>
            ))
          ) : (
            <div className='py-2 text-center text-gray-500'>{t('no_urls')}</div>
          )}

          {isLoading &&
            Array(8)
              .fill(0)
              .map((_, index) => <Skeleton key={index} className='h-16 w-full mt-2 rounded-md' />)}
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
