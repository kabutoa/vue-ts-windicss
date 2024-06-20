export interface IMockData {
  type: string
  url: string
  response: unknown
  apiPrefix?: boolean
  [key: string]: unknown
}
