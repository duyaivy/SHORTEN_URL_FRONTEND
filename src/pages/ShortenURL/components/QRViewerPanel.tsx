import { RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { EveryQRCode } from '@every-qrcode/react'
import { PRESETS } from '../constants/presets'

interface QRViewerPanelProps {
  qrUrl: string
  presetIdx: number
  setPresetIdx: (idx: number) => void
  isPending: boolean
  isSuccess: boolean
  qrContainerRef: RefObject<HTMLDivElement | null>
}

export default function QRViewerPanel({
  qrUrl,
  presetIdx,
  setPresetIdx,
  isPending,
  isSuccess,
  qrContainerRef
}: QRViewerPanelProps) {
  const { t } = useTranslation()

  const activePreset = PRESETS[presetIdx]

  return (
    <div className='flex flex-col items-center gap-3.5 w-full'>
      {/* QR 3D / 2D Viewer container */}
      <div className='relative w-full overflow-hidden' style={{ maxWidth: 440 }}>
        <div ref={qrContainerRef} className='w-full aspect-square'>
          <EveryQRCode
            key={qrUrl}
            url={qrUrl}
            style={{ width: '100%', height: '100%' }}
            interactive={true}
            model='tree'
            initialView='model'
            scene={activePreset.scene}
          />
        </div>

        {/* Pending Spinner Overlay */}
        {isPending && (
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 backdrop-blur-sm z-10'>
            <div className='size-9 border-2 border-main border-t-transparent rounded-full animate-spin' />
            <span className='text-main text-sm font-medium'>Đang tạo...</span>
          </div>
        )}

        {/* Live Badge */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className='absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-main/60 backdrop-blur-sm text-main text-xs font-semibold z-10'
            >
              <span className='size-1.5 rounded-full bg-main animate-pulse' />
              Live
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Hint */}
      <p className='text-xs text-white/40 text-center'>
        {isSuccess ? t('qr_hint_success') : t('qr_hint_default')}
      </p>

      {/* Season Preset Buttons */}
      <div className='flex items-center gap-1.5 flex-wrap justify-center'>
        {PRESETS.map((p, i) => (
          <button
            key={p.key}
            type='button'
            onClick={() => setPresetIdx(i)}
            className={[
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border',
              presetIdx === i
                ? 'bg-white/15 border-white/40 text-white shadow-sm'
                : 'bg-transparent border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'
            ].join(' ')}
          >
            {t(p.i18nKey)}
          </button>
        ))}
      </div>
    </div>
  )
}
