import { useLoginMutation } from '@/apis/auth.api'
import { path } from '@/constants/path'
import { useParamsString } from '@/hooks/useUrlParams'
import { authApi } from '@/services/auth.service'
import { Toast } from '@/utils/toastMessage'
import { LinkIcon, ScanQrCode } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const HomePage = () => {
  const { t } = useTranslation(['common'])
  const { code } = useParamsString()
  const mutationLogin = useLoginMutation({
    mutationFn: authApi.loginWithGG,
    handleError: () => {
      Toast.error({ description: t('message:failed_to_login_with_google') })
    }
  })
  useEffect(() => {
    if (code) {
      mutationLogin.mutate({ code })
    }
  }, [code])
  return (
    <div className='max-w-5xl mx-auto px-4 flex gap-2 mo:gap-20 flex-col md:flex-row justify-around items-center pb-16 '>
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0.5, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Link to={path.scan_qr} className='flex flex-col justify-center items-center group gap-3 max-w-sm'>
          <ScanQrCode className='size-64 md:size-80 text-white group-hover:text-main duration-300' />
          <h2 className='text-4xl  text-main '>{t('scan_qr')}</h2>
          <p className='text-lg min-h-16 duration-300 group-hover:text-main text-white'>{t('scan_qr_description')}</p>
        </Link>
      </motion.div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 300 }}
        transition={{
          height: { delay: 0.1, duration: 0.8, ease: 'easeOut' }
        }}
        className='hidden md:block w-1.5 bg-main h-80'
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0.5, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Link to={path.shorten_link} className='flex flex-col justify-center items-center group gap-3 '>
          <LinkIcon className='size-64 md:size-80 text-white group-hover:text-main duration-300' />
          <h2 className='text-4xl text-main '>{t('shorten_link')}</h2>
          <p className='text-lg min-h-16 duration-300 group-hover:text-main text-white'>
            {t('shorten_link_description')}
          </p>
        </Link>
      </motion.div>
    </div>
  )
}

export default HomePage
