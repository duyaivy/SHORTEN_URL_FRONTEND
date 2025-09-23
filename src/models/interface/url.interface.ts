export interface URL {
  _id?: string
  owner_id: string
  views?: number
  url?: string
  alias?: string
  password?: string
  is_active?: boolean
  qr_code?: string
  created_at?: string
  updated_at?: string
  short_url?: string
}
export interface GetAliasConfig {
  alias?: string
  password?: string
}
