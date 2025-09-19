export interface SuccessResponse<dataType> {
  statusCode: number
  success?: string
  message: string
  data: dataType
}

export interface FailResponse<dataType> {
  statusCode?: number
  success?: string
  message?: string
  data?: dataType
}
export interface PaginationResponse {
  page?: number
  limit?: number
  total?: number
}
