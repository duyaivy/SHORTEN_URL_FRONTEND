import { GetAliasConfig } from '@/models/interface/url.interface'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { useSearchParams } from 'react-router-dom'

export type QueryAliasConfig = {
  [key in keyof GetAliasConfig]: string
}
export const useParamsString = () => {
  const [searchParams] = useSearchParams()
  return Object.fromEntries(searchParams.entries())
}
export const useAliasQueryConfig = () => {
  const queryString: QueryAliasConfig = useParamsString()
  const queryConfig: QueryAliasConfig = omitBy(
    {
      alias: queryString.alias,
      password: queryString.password
    },
    isUndefined
  )

  return queryConfig
}
