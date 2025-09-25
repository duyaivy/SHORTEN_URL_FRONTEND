import { radioButton } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Toast } from '@/utils/toastMessage'
import { Copy, QrCode } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Lottie from 'react-lottie-player'
import { saveAs } from 'file-saver'
import axios from 'axios'
interface ReturnValueProps {
  qr_code_link?: string
  short_url?: string
  type?: 'click' | 'listen'
}
export default function ReturnValue({ qr_code_link, short_url, type = 'listen' }: ReturnValueProps) {
  const { t } = useTranslation()
  const handleCopy = () => {
    if (short_url) {
      navigator.clipboard.writeText(short_url)
      Toast.success({ description: t('copy_success') + ' ' + short_url })
    }
  }
  const handleDownload = async () => {
    if (qr_code_link) {
      try {
        const response = await axios.get(qr_code_link, {
          responseType: 'blob'
        })
        saveAs(response.data, 'QR_Code.png')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        Toast.error({ description: t('download_qr_error') })
      }
    }
  }
  return (
    <Dialog defaultOpen={type === 'listen' ? Boolean(qr_code_link) : false}>
      {type === 'click' && (
        <DialogTrigger className='flex items-center'>
          <QrCode className='size-5 md:size-6 cursor-pointer' />
        </DialogTrigger>
      )}
      <DialogContent className='max-w-11/12 sm:max-w-md bg-black border-main border-1 '>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center'>
            <Lottie className='size-30' animationData={radioButton} play loop={false} />
          </DialogTitle>
          <DialogDescription>{t('shorten_link_success')}</DialogDescription>
        </DialogHeader>
        <div className='w-full justify-center flex'>
          <div className='size-48 bg-white rounded-sm'>
            <img className='size-48' src={qr_code_link} alt='QR Code' />
          </div>
        </div>
        <div className='w-full'>
          <Input value={short_url} disabled icon={<Copy />} iconOnClick={handleCopy} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button className='px-4 border-white/50 cursor-pointer border-1 rounded-md py-1.5'>{t('exit')}</button>
          </DialogClose>
          <Button className='bg-main text-black hover:bg-main/80 cursor-pointer duration-300' onClick={handleDownload}>
            {t('save_qr_image')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
