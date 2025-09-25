import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import UpdateUrlDialog from '@/components/UpdateUrlDialog'
import { ExtraURL, URL } from '@/models/interface/url.interface'
import ReturnValue from '@/pages/ShortenURL/ReturnValue'
import { Eye, Trash2 } from 'lucide-react'

interface ManageUrlsProps {
  myUrls: ExtraURL[]
  onCheck: (_id: string) => void
  handleChangeStatus?: (_id: string, is_active: boolean) => void
  handleDelete?: (_id: string) => void
  isDeleting?: boolean
  isChangingStatus?: boolean
  isOnUpdate?: boolean
  handleUpdate?: (alias: string, url: URL) => void
}

export default function ManageUrls({
  myUrls,
  onCheck,
  handleChangeStatus,
  handleDelete,
  handleUpdate,
  isDeleting = false,
  isChangingStatus = false,
  isOnUpdate = false
}: ManageUrlsProps) {
  return (
    <div className='flex-col w-full mt-4 '>
      {myUrls.map((url) => (
        <div
          key={url._id}
          className='border-b py-2 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-black/60 transition'
        >
          <div className='flex items-center gap-3 grow '>
            <Checkbox checked={url.isCheck} onClick={() => onCheck(url._id as string)} />
            <div className='flex flex-col'>
              <a href={url.url} className=' font-medium hover:underline'>
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
              <button disabled={isDeleting} className='p-2 duration-300 cursor-pointer text-red-500 hover:text-red-600'>
                <Trash2 className='size-5 md:size-6' />
              </button>
            </ConfirmDeleteDialog>
          </div>
        </div>
      ))}
    </div>
  )
}
