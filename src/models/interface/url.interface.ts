export interface URL {
  id?: string
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
export interface ExtraURL extends URL {
  isCheck: boolean
}
export interface UrlMiniUpdate {
  id: string
  is_active: boolean
}
export interface GetPaginationConfig {
  page?: number
  limit?: number
  search?: string
}

export interface QrHistory {
  decoded?: string
  id?: string
  created_at?: string
  date?: string
}
export interface ExtraQrHistory extends QrHistory {
  isCheck: boolean
}
