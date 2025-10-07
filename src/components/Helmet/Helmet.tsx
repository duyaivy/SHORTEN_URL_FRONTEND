import { useLocation } from 'react-router-dom'
import { Helmet as ReactHelmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { path } from '@/constants/path'

interface HelmetProps {
  title?: string
  description?: string
}

export default function Helmet({ title, description }: HelmetProps) {
  const location = useLocation()
  const { t } = useTranslation(['helmet'])

  const currentPath = location.pathname as keyof typeof path

  const titleKey = `titles.${currentPath}`
  const descriptionKey = `descriptions.${currentPath}`

  const titleAuto = t(titleKey, { defaultValue: 'ShortLink' })
  const descriptionAuto = t(descriptionKey, {
    defaultValue: 'ShortLink - Dịch vụ rút gọn link thông minh, an toàn.'
  })

  return (
    <ReactHelmet>
      <title>{title || titleAuto}</title>
      <meta name='description' content={description || descriptionAuto} />
    </ReactHelmet>
  )
}
