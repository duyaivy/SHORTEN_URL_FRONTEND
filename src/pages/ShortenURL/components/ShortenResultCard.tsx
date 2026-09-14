import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Check, Copy, Download } from 'lucide-react'

interface ShortenResultCardProps {
  shortUrl: string
  copied: boolean
  onCopy: () => void
  onDownloadQR: () => void
}

export default function ShortenResultCard({
  shortUrl,
  copied,
  onCopy,
  onDownloadQR
}: ShortenResultCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className='rounded-2xl border border-main/30 bg-main/5 p-4 space-y-3 mt-4'
    >
      <div className='flex items-center gap-2 text-main text-sm font-semibold'>
        <span className='flex items-center justify-center size-5 rounded-full bg-main/20'>
          <Check className='size-3' />
        </span>
        {t('shorten_link_success')}
      </div>

      <div className='flex items-center gap-2'>
        <div className='flex-1 truncate text-sm font-mono text-main/90 bg-black/30 rounded-lg px-3 py-2 border border-white/10'>
          {shortUrl}
        </div>
        <button
          type='button'
          onClick={onCopy}
          className='flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/20 text-xs text-white/70 hover:border-main hover:text-main duration-200 cursor-pointer shrink-0'
        >
          {copied ? <Check className='size-3.5 text-main' /> : <Copy className='size-3.5' />}
          {copied ? t('copied') : t('copy')}
        </button>
      </div>

      <button
        type='button'
        onClick={onDownloadQR}
        className='flex items-center gap-2 w-full justify-center py-2 rounded-xl border border-main/40 text-main text-sm hover:bg-main hover:text-black duration-300 cursor-pointer font-medium'
      >
        <Download className='size-4' />
        {t('save_qr_image')}
      </button>
    </motion.div>
  )
}
