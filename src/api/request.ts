import axios from 'axios'
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig
} from 'axios'
import { useTokenStore, useLoadingStore, useToastStore } from '@/stores'
import type { IRes } from './types'

const service: AxiosInstance = axios.create({
  baseURL: '/',
  timeout: 10000
})

// 移除重复请求
const requestUrls: string[] = []
let requestFlag = ''
const removeRequestUrl = () => {
  const index = requestUrls.indexOf(requestFlag)
  if (index > -1) {
    requestUrls.splice(index, 1)
  }
}

// 初始化store
const { getToken } = useTokenStore()
const { setLoading } = useLoadingStore()
const { setToast } = useToastStore()

service.interceptors.request.use(
  (req: InternalAxiosRequestConfig & { mask?: boolean }) => {
    setLoading(true, req.mask)
    requestFlag = `${req.url}${req.method}`
    if (requestUrls.includes(requestFlag)) {
      req.cancelToken = new axios.CancelToken((cancel) => {
        cancel('duplicate request')
      })
    } else {
      requestUrls.push(requestFlag)
      getToken && (req.headers['Authorization'] = `Bearer ${getToken}`)
    }
    return req
  },
  (error: AxiosError) => {
    setLoading(false, false)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res: AxiosResponse) => {
    setLoading(false, false)
    removeRequestUrl()
    const { status, msg } = res.data
    if (status === 'error') {
      setToast({
        show: true,
        msg
      })
      return Promise.reject(msg)
    }
    return res.data
  },
  (error: AxiosError) => {
    if (error.message === 'duplicate request') {
      return Promise.reject(error.message)
    }
    setLoading(false, false)
    setToast({ show: true, msg: error.message || 'NETWORK_ERROR' })
    removeRequestUrl()
    return Promise.reject(error)
  }
)

export const request = <T>(config: AxiosRequestConfig): Promise<IRes<T>> => {
  if (config.method?.toLowerCase() === 'get') {
    config.params = config.data
  }

  if (config.method?.toLowerCase() === 'post') {
    config.headers = config.headers || {}
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }

  return service(config)
}

export const upload = <T>(config: AxiosRequestConfig): Promise<IRes<T>> => {
  config.headers = config.headers || {}
  config.headers['Content-Type'] = 'multipart/form-data'
  return service(config)
}
