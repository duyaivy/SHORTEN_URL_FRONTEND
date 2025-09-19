import { ComingSoon as CM } from '@/assets/videos'
import { useTranslation } from 'react-i18next'

export default function CommingSoon() {
  const { t } = useTranslation(['common'])
  return (
    <div className='flex flex-col items-center justify-center p-8 text-center mt-20'>
      <div className='flex items-center justify-center'>
        <video autoPlay loop muted className='max-w-xl h-auto object-cover'>
          <source src={CM} type='video/mp4' />
        </video>
      </div>
      <h1 className='text-2xl font-bold mb-2'>{t('coming_soon')}</h1>
      <p className='text-gray-600'>{t('coming_soon_description')}</p>
    </div>
  )
}
