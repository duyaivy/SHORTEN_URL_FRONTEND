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

  const isUnavailableOrError =
    currentPath === path.link_unavailable ||
    currentPath === ('/a/link-unavailable' as any) ||
    currentPath === path.notFound

  return (
    <ReactHelmet>
      <title>{title || titleAuto}</title>
      <meta name='description' content={description || descriptionAuto} />
      {isUnavailableOrError && (
        <>
          <meta name='robots' content='noindex, nofollow, noarchive, nosnippet' />
          <meta name='googlebot' content='noindex, nofollow, noarchive, nosnippet' />
          <meta name='bingbot' content='noindex, nofollow, noarchive, nosnippet' />
          <meta name='prerender-status-code' content='410' />
        </>
      )}
    </ReactHelmet>
  )
}
