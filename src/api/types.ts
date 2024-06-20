export interface IRes<T> {
  status: boolean
  code: number
  msg: string
  data: T
}
