import config from '@/constants/config.const'
import { clearLS } from '@/utils/storage'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios'

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

let isRefreshing: boolean = false
type RefreshSubscriber = () => void
let refreshSubscribers: RefreshSubscriber[] = []

const addSubscriber = (callback: RefreshSubscriber): void => {
  refreshSubscribers.push(callback)
}

const onRefreshed = (): void => {
  refreshSubscribers.forEach((callback) => callback())
  refreshSubscribers = []
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig

    if (error.response && error.response.status === HttpStatusCode.Unauthorized && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true
        isRefreshing = true

        try {
          // Call refresh token endpoint with credentials (cookies)
          await axios.post(`${config.baseUrl}/auth/refresh-token`, {}, { withCredentials: true })

          onRefreshed()
          isRefreshing = false
          return axiosClient(originalRequest)
        } catch (refreshError) {
          isRefreshing = false
          logout()
          return Promise.reject(refreshError)
        }
      } else {
        return new Promise((resolve, reject) => {
          addSubscriber(() => {
            axiosClient(originalRequest).then(resolve).catch(reject)
          })
        })
      }
    }

    return Promise.reject(error)
  }
)

const logout = (): void => {
  clearLS()
  window.location.href = '/a/login'
}

export default axiosClient
