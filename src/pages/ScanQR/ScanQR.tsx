import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CameraIcon, ImageUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import OutputLink from './OutputLink'
import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Toast } from '@/utils/toastMessage'
export default function ScanQR() {
  const { t } = useTranslation()
  let dateNow = new Date()
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null)
  const [value, setValue] = useState<string>('')
  useEffect(() => {
    if (!html5QrCodeRef.current) {
      html5QrCodeRef.current = new Html5Qrcode('reader')
    }
    return () => {
      html5QrCodeRef.current?.clear()
    }
  }, [])
  const handleScan = () => {
    if (html5QrCodeRef.current) {
      html5QrCodeRef.current?.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          setValue(decodedText)
          html5QrCodeRef.current?.stop().catch(() => {})
        },
        () => {
          if (dateNow.getTime() + 10000 < new Date().getTime()) {
            Toast.error({ description: t('cannot_detect_qr_code') })
            dateNow = new Date()
          }
        }
      )
    }
  }
  const handleChangeTab = (value: string) => {
    if (value !== 'scan_qr' && html5QrCodeRef.current?.isScanning) {
      html5QrCodeRef.current?.stop().catch(() => {})
    }
  }
  return (
    <>
      <div className='max-w-5xl mx-auto '>
        <div className='flex justify-center flex-col items-center '>
          <Tabs defaultValue='scan_qr' className='w-full ' onValueChange={(value) => handleChangeTab(value)}>
            <TabsList>
              <TabsTrigger value='scan_qr'>{t('scan_qr')}</TabsTrigger>
              <TabsTrigger value='upload_qr'>{t('upload_qr')}</TabsTrigger>
            </TabsList>
            <TabsContent value='scan_qr'>
              <div className='flex flex-col gap-5 justify-center items-center min-h-96 px-3 '>
                <div className='flex flex-col justify-center items-center w-full md:w-3/5 h-full text-white  p-10 border-dashed border-2 border-white rounded-lg cursor-pointer duration-300'>
                  <div onClick={handleScan} className='w-72 h-72  bg-transparent mb-2 relative'>
                    <CameraIcon className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-24 md:size-40 text-white duration-300 animate-pulse' />
                    <div id='reader' className='w-full h-full flex justify-center'></div>
                  </div>
                  <p className='text-lg duration-300  text-white'>{t('scan_qr_code_description')}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value='upload_qr'>
              <div className='flex flex-col gap-5 justify-center items-center min-h-96 px-3 '>
                <div className='flex flex-col justify-center items-center w-full md:w-3/5 h-full text-white group p-10 border-dashed border-2 border-white rounded-lg hover:border-main hover:text-main cursor-pointer duration-300'>
                  <div className='w-72 h-72 flex justify-center items-center mb-2'>
                    <ImageUp className='size-24 md:size-40 text-white group-hover:text-main duration-300' />
                  </div>
                  <p className='text-lg duration-300 group-hover:text-main text-white'>{t('upload_qr_description')}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <OutputLink link={value} />
    </>
  )
}
