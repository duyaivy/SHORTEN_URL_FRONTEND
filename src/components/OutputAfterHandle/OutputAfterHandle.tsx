import LinkHoverAnimate from '@/components/LinkHoverAnimate'
import { Input } from '@/components/ui/input'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Toast } from '@/utils/toastMessage'
import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { To } from 'react-router-dom'
import Lottie from 'react-lottie-player'
import radioButton from '@/assets/icons/radioButton.json'

interface OutputAfterHandleProps {
  link?: string
}
export default function OutputAfterHandle({ link }: OutputAfterHandleProps) {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const handleCopy = () => {
    if (link) {
      navigator.clipboard.writeText(link)
      Toast.success({ description: t('copy_success') + ' ' + link })
    }
  }
  useEffect(() => {
    setOpen(Boolean(link))
  }, [link])
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='bottom'>
        <div className='max-w-3xl mx-auto min-w-2xs sm:min-w-xl md:min-w-2xl flex flex-col items-center'>
          <SheetHeader>
            <SheetTitle className='flex justify-center items-center'>
              <Lottie className='size-48' animationData={radioButton} play loop={false} />
            </SheetTitle>
            <SheetDescription>{t('decode_qr_description')}</SheetDescription>
          </SheetHeader>
          <div className={'flex w-full justify-center gap-2  flex-col mt-4 mb-8 md:flex-row  items-center'}>
            <div className='w-full md:w-3/5 '>
              <Input
                value={link}
                disabled
                placeholder={t('url_res_placeholder')}
                icon={<Copy />}
                iconOnClick={handleCopy}
              />
            </div>

            <LinkHoverAnimate
              className='w-full text-center text-lg mx-4 md:w-auto py-3'
              text={t('access')}
              to={link as To}
            />
          </div>
          <SheetClose />
        </div>
      </SheetContent>
    </Sheet>
  )
}
