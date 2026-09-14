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
import { QRCodeCanvas } from 'qrcode.react'
import { useRef } from 'react'

interface ReturnValueProps {
  short_url?: string
  type?: 'click' | 'listen'
}

export default function ReturnValue({ short_url, type = 'listen' }: ReturnValueProps) {
  const { t } = useTranslation()
  const qrContainerRef = useRef<HTMLDivElement>(null)

  const handleCopy = () => {
    if (short_url) {
      navigator.clipboard.writeText(short_url)
      Toast.success({ description: t('copy_success') + ' ' + short_url })
    }
  }

  const handleDownload = () => {
    if (!qrContainerRef.current) return
    const canvas = qrContainerRef.current.querySelector('canvas')
    if (!canvas) {
      Toast.error({ description: t('download_qr_error') })
      return
    }
    try {
      const imageUri = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = imageUri
      a.download = 'QR_Code.png'
      a.click()
    } catch {
      Toast.error({ description: t('download_qr_error') })
    }
  }

  return (
    <Dialog defaultOpen={type === 'listen' ? Boolean(short_url) : false}>
      {type === 'click' && (
        <DialogTrigger className='flex items-center'>
          <QrCode className='size-5 md:size-6 cursor-pointer' />
        </DialogTrigger>
      )}
      <DialogContent className='max-w-11/12 sm:max-w-md bg-black border-main border-1'>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center'>
            <Lottie className='size-30' animationData={radioButton} play loop={false} />
          </DialogTitle>
          <DialogDescription>{t('shorten_link_success')}</DialogDescription>
        </DialogHeader>

        <div className='w-full justify-center flex'>
          <div ref={qrContainerRef} className='p-3 bg-white rounded-xl flex items-center justify-center shadow-lg'>
            {short_url && (
              <QRCodeCanvas
                value={short_url}
                size={220}
                bgColor='#ffffff'
                fgColor='#000000'
                level='H'
              />
            )}
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
