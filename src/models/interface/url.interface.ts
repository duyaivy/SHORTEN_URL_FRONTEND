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
export interface ExtraURL extends URL {
  isCheck: boolean
}
export interface UrlMiniUpdate {
  is_active: boolean
  _id: string
}
export interface GetPaginationConfig {
  page?: number
  limit?: number
  search?: string
}

export interface QrHistory {
  decoded?: string
  _id?: string
  created_at?: string
  date?: string
}
export interface ExtraQrHistory extends QrHistory {
  isCheck: boolean
}
