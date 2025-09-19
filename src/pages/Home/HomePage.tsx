import { path } from '@/constants/path'
import { LinkIcon, ScanQrCode } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { t } = useTranslation(['common'])

  return (
    <div className='max-w-5xl mx-auto px-4 flex gap-2 mo:gap-20 flex-col md:flex-row justify-around items-center pb-16 '>
      <Link to={path.scan_qr} className='flex flex-col justify-center items-center group gap-3 max-w-sm'>
        <ScanQrCode className='size-64 md:size-80 text-white group-hover:text-main duration-300' />
        <h2 className='text-4xl  text-main '>{t('scan_qr')}</h2>
        <p className='text-lg min-h-16 duration-300 group-hover:text-main text-white'>{t('scan_qr_description')}</p>
      </Link>
      <div className='hidden md:block w-1.5 bg-main h-80' />
      <Link to={path.shorten_link} className='flex flex-col justify-center items-center group gap-3 '>
        <LinkIcon className='size-64 md:size-80 text-white group-hover:text-main duration-300' />
        <h2 className='text-4xl text-main '>{t('shorten_link')}</h2>
        <p className='text-lg min-h-16 duration-300 group-hover:text-main text-white'>
          {t('shorten_link_description')}
        </p>
      </Link>
    </div>
  )
}

export default HomePage
