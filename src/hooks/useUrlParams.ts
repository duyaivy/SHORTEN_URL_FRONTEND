import { GetPaginationConfig } from '@/models/interface/url.interface'
import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { useSearchParams } from 'react-router-dom'

export type QueryUrlsConfig = {
  [key in keyof GetPaginationConfig]: string
}
export const useParamsString = () => {
  const [searchParams] = useSearchParams()
  return Object.fromEntries(searchParams.entries())
}
export const useUrlsQueryConfig = () => {
  const queryString: QueryUrlsConfig = useParamsString()
  const queryConfig: QueryUrlsConfig = omitBy(
    {
      page: queryString.page || '1',
      limit: queryString.limit || '8',
      search: queryString.search || ''
    },
    isUndefined
  )

  return queryConfig
}
