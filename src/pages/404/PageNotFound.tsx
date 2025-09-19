import LinkHoverAnimate from '@/components/LinkHoverAnimate'
import { path } from '@/constants/path'
import { useTranslation } from 'react-i18next'

const PageNotFound = () => {
  const { t } = useTranslation(['common'])
  return (
    <div className='flex flex-col items-center justify-center '>
      <h1 className='font-bold text-9xl'>404</h1>
      <h2 className='mb-5'>Page not found</h2>
      <LinkHoverAnimate text={t('return_home')} to={path.home} className='mb-5 text-lg font-medium' />
    </div>
  )
}

export default PageNotFound
