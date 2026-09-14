import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link2Off, PlusCircle, QrCode, Copy, Check, Sparkles } from 'lucide-react'

import { path } from '@/constants/path'
import { Button } from '@/components/ui/button'

export default function LinkUnavailable() {
  const { t } = useTranslation(['common'])
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const alias = searchParams.get('alias')
  const customMessage = searchParams.get('message')

  const [copied, setCopied] = useState(false)

  const handleCopyAlias = () => {
    if (alias) {
      navigator.clipboard.writeText(alias)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const pageTitle = `${t('link_unavailable_title')} | ShortLink`
  const pageDescription = customMessage || t('link_unavailable_desc')

  return (
    <div className='relative w-full max-w-2xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center min-h-[70vh]'>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name='description' content={pageDescription} />

        {/* Bot & Web Crawler Directives */}
        <meta name='robots' content='noindex, nofollow, noarchive, nosnippet' />
        <meta name='googlebot' content='noindex, nofollow, noarchive, nosnippet' />
        <meta name='bingbot' content='noindex, nofollow, noarchive, nosnippet' />

        {/* Status code hint for Prerender / Headless crawlers */}
        <meta name='prerender-status-code' content='410' />

        {/* Social Sharing / Messaging Bots (Facebook, Telegram, Discord, Zalo) */}
        <meta property='og:title' content={pageTitle} />
        <meta property='og:description' content={pageDescription} />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:description' content={pageDescription} />
      </Helmet>
      {/* Background ambient neon glow spheres */}
      <div className='absolute -top-10 -left-10 w-72 h-72 bg-[#64ffda]/10 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute -bottom-10 -right-10 w-72 h-72 bg-[#ff5370]/10 rounded-full blur-3xl pointer-events-none' />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className='relative w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 sm:p-10 shadow-2xl shadow-black/50 text-center overflow-hidden'
      >
        {/* Top subtle gradient accent line */}
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#64ffda] to-transparent opacity-80' />

        {/* Icon & Status Badge */}
        <div className='flex flex-col items-center gap-4 mb-6'>
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className='relative flex items-center justify-center size-20 sm:size-24 rounded-2xl bg-gradient-to-br from-rose-500/20 via-amber-500/10 to-teal-500/20 border border-rose-500/30 shadow-lg shadow-rose-500/10'
          >
            <Link2Off className='size-10 sm:size-12 text-rose-400' strokeWidth={1.75} />
            <span className='absolute -top-1 -right-1 flex h-4 w-4'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75' />
              <span className='relative inline-flex rounded-full h-4 w-4 bg-rose-500' />
            </span>
          </motion.div>

          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-500/15 text-rose-300 border border-rose-500/25'>
            {t('link_unavailable_badge')}
          </span>
        </div>

        {/* Headings */}
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3'>
          {t('link_unavailable_title')}
        </h1>
        <p className='text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-6'>
          {customMessage || t('link_unavailable_desc')}
        </p>

        {/* Alias chip if present */}
        {alias && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs sm:text-sm text-gray-300 mb-6 max-w-full'
          >
            <span className='text-gray-400'>{t('link_unavailable_alias_label')}</span>
            <span className='font-mono font-medium text-[#64ffda] truncate max-w-[200px] sm:max-w-[300px]'>
              {alias}
            </span>
            <button
              type='button'
              onClick={handleCopyAlias}
              className='p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer'
              title='Copy alias'
            >
              {copied ? <Check className='size-3.5 text-emerald-400' /> : <Copy className='size-3.5' />}
            </button>
          </motion.div>
        )}

        {/* Pro Tip Callout */}
        <div className='flex items-center gap-2.5 p-3 rounded-lg bg-[#64ffda]/5 border border-[#64ffda]/20 text-xs text-gray-300 mb-8 text-left'>
          <Sparkles className='size-4 text-[#64ffda] shrink-0' />
          <span>{t('link_unavailable_tip')}</span>
        </div>

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 w-full'>
          <Button
            onClick={() => navigate(path.shorten_link)}
            className='w-full sm:w-auto px-6 h-11 bg-[#64ffda] text-gray-950 font-semibold hover:bg-[#64ffda]/90 transition-all shadow-lg shadow-[#64ffda]/20 cursor-pointer flex items-center justify-center gap-2'
          >
            <PlusCircle className='size-4' />
            {t('link_unavailable_btn_shorten')}
          </Button>

          <Button
            variant='outline'
            onClick={() => navigate(path.scan_qr)}
            className='w-full sm:w-auto px-6 h-11 border-white/20 text-gray-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2'
          >
            <QrCode className='size-4' />
            {t('link_unavailable_btn_scan')}
          </Button>

          <Button
            variant='ghost'
            onClick={() => navigate(path.home)}
            className='w-full sm:w-auto px-5 h-11 text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center justify-center gap-2'
          >
           
            {t('return_home')}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
