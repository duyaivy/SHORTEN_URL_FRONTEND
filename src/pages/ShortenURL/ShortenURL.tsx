import { useContext, useRef, useState, useCallback } from 'react'
import QRCode from 'qrcode'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import ReCAPTCHA from 'react-google-recaptcha'

import { useRecapchaMutation, useShortenUrlMutation } from '@/apis/url.api'
import { AppContext } from '@/contexts/app.context'
import { useHandleError } from '@/utils/handleErrorAPI'
import { ShortenURLSchema, ShortenURLSchemaType } from '@/zods/url.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import config from '@/constants/config.const'
import { queryKeys } from '@/helpers/key-tanstack'
import { Toast } from '@/utils/toastMessage'

import { DEFAULT_URL } from './constants/presets'
import QRViewerPanel from './components/QRViewerPanel'
import ShortenFormPanel from './components/ShortenFormPanel'
import ShortenResultCard from './components/ShortenResultCard'

export default function ShortenURL() {
  const { t } = useTranslation()
  const { isAuthenticated } = useContext(AppContext)
  const queryClient = useQueryClient()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const qrContainerRef = useRef<HTMLDivElement>(null)

  const [copied, setCopied] = useState(false)
  const [presetIdx, setPresetIdx] = useState(0)
  const [isCustomAlias, setIsCustomAlias] = useState<boolean>(false)

  const form = useForm<ShortenURLSchemaType>({
    resolver: zodResolver(ShortenURLSchema()),
    defaultValues: { url: '', alias: '', password: '' }
  })

  const aliasValue = form.watch('alias')
  const { handleErrorAPI } = useHandleError()

  const useRecaptcha = useRecapchaMutation({
    onError: (error: any) => {
      Toast.error({ description: error.response?.data.message })
    }
  })

  const shortenLinkMutation = useShortenUrlMutation({
    onError: (error) => handleErrorAPI(error, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.myUrls] })
    }
  })

  const shortUrl = shortenLinkMutation.data?.data.data.short_url
  const isSuccess = shortenLinkMutation.isSuccess
  const isPending = shortenLinkMutation.isPending

  const qrUrl = isSuccess && shortUrl
    ? shortUrl
    : isCustomAlias && aliasValue
      ? `${config.baseUrl}/${aliasValue}`
      : DEFAULT_URL

  const handleSubmit = async () => {
    const recapchaValue = await recaptchaRef.current?.executeAsync()
    recaptchaRef.current?.reset()
    if (recapchaValue) {
      try {
        await useRecaptcha.mutateAsync(recapchaValue)
        const formValues = form.getValues()
        const data = {
          url: formValues.url?.trim(),
          alias: isCustomAlias && formValues.alias?.trim() ? formValues.alias.trim() : undefined,
          password: formValues.password || undefined
        }
        shortenLinkMutation.mutate(data)
      } catch (error: any) {
        Toast.error({ description: error.response?.data.message })
      }
    }
  }

  const handleReset = () => {
    setIsCustomAlias(false)
    form.reset()
    shortenLinkMutation.reset()
    setCopied(false)
  }

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = useCallback(async () => {
    if (!shortUrl && !qrUrl) return
    const downloadUrl = shortUrl || qrUrl
    try {
      const canvas = document.createElement('canvas')
      await QRCode.toCanvas(canvas, downloadUrl, {
        width: 512,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
        errorCorrectionLevel: 'H'
      })
      canvas.toBlob((blob) => {
        if (!blob) { Toast.error({ description: t('download_qr_error') }); return }
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'QR_Code.png'
        a.click()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch {
      Toast.error({ description: t('download_qr_error') })
    }
  }, [shortUrl, qrUrl, t])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='w-full max-w-5xl mx-auto px-4 py-4'
    >
      {/* Page Header */}
      <div className='text-center mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-main to-secondary bg-clip-text text-transparent'>
          {t('shorten_link')}
        </h1>
        <p className='text-muted-foreground text-xs md:text-sm'>{t('shorten_link_description')}</p>
      </div>

      {/* Main Two-Column Layout */}
      <div className='flex flex-col lg:flex-row lg:items-center gap-8'>
        {/* Left Column: QR 3D Viewer */}
        <div className='w-full lg:w-1/2 flex justify-center'>
          <div className='w-full max-w-md lg:max-w-none'>
            <QRViewerPanel
              qrUrl={qrUrl}
              presetIdx={presetIdx}
              setPresetIdx={setPresetIdx}
              isPending={isPending}
              isSuccess={isSuccess}
              qrContainerRef={qrContainerRef}
            />
          </div>
        </div>

        {/* Vertical Divider */}
        <div className='hidden lg:block w-px bg-white/10 self-stretch' />

        {/* Right Column: Form Panel & Result */}
        <div className='w-full lg:w-1/2'>
          <ShortenFormPanel
            form={form}
            isAuthenticated={isAuthenticated}
            isPending={isPending}
            isCustomAlias={isCustomAlias}
            setIsCustomAlias={setIsCustomAlias}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />

          <AnimatePresence>
            {isSuccess && shortUrl && (
              <ShortenResultCard
                shortUrl={shortUrl}
                copied={copied}
                onCopy={handleCopy}
                onDownloadQR={handleDownload}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <ReCAPTCHA hidden ref={recaptchaRef} size='invisible' sitekey={config.siteKeyCapcha} />
    </motion.div>
  )
}
