import { request } from '@/api/request'
import type { TUserReq, TUserRes } from '../types'

export const login = (data: TUserReq) => {
  return request<TUserRes>({
    url: '/userinfo',
    method: 'post',
    data
  })
}
