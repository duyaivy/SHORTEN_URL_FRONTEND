import { useTranslation } from 'react-i18next'
import z from 'zod'

export const ShortenURLSchema = () => {
  const { t } = useTranslation(['message'])
  return z.object({
    url: z
      .string()
      .url(t('error_url'))
      .min(3, { message: t('url_required') }),
    alias: z
      .string()
      .min(3, { message: t('alias_min_length') })
      .max(30, { message: t('alias_max_length') })
  })
}
export type ShortenURLSchemaType = z.infer<ReturnType<typeof ShortenURLSchema>>
