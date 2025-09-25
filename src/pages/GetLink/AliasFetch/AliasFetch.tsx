import { useQueryAlias } from '@/apis/url.api'
import { path } from '@/constants/path'
import { Toast } from '@/utils/toastMessage'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigate, useParams } from 'react-router-dom'

export default function AliasFetch() {
  const { alias } = useParams()
  const { t } = useTranslation('message')
  const useAliasQuery = useQueryAlias({ alias: alias as string })
  const navigate = useNavigate()
  useEffect(() => {
    if (useAliasQuery.error) {
      const errorMessage =
        (useAliasQuery.error as any)?.response?.data?.message ||
        useAliasQuery.error.message ||
        t('something_went_wrong')
      Toast.error({ description: errorMessage })
      navigate(path.notFound)
    } else if (useAliasQuery.data) {
      const shortUrl = useAliasQuery.data.data.data.url
      window.location.href = shortUrl || path.home
    }
  }, [useAliasQuery.error, t, navigate, useAliasQuery.data])
  return <div>{/**no content */}</div>
}
