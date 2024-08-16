import { fileURLToPath } from 'url'
import { readdir } from 'fs/promises'
import path, { dirname } from 'path'
import { IMockData } from '../types'

export function getResponse(data) {
  const initialResponse = {
    status: 'success',
    msg: ''
  }
  return {
    ...initialResponse,
    data
  }
}

export const PORT = 3000

export const SUPPORT_METHODS = ['get', 'post', 'put', 'delete', 'head']

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const getMocks = async () => {
  const serviceUrl = path.resolve(__dirname, '../services')
  const serviceFiles = await readdir(serviceUrl)
  const mockModules = await Promise.all(
    serviceFiles.map(async (file) => {
      const m = await import(path.resolve(__dirname, '../services', file))
      return m.default
    })
  )
  return mockModules
}

export const buildRouter = async (router) => {
  const mocks = (await getMocks()) as IMockData[]
  mocks.forEach(({ type, url, response, timeout, apiPrefix = true }) => {
    if (SUPPORT_METHODS.includes(type) && url) {
      router[type](apiPrefix ? `/api${url}` : url, async (ctx, next) => {
        ctx.body = typeof response === 'function' ? response() : response
        await new Promise((resolve) =>
          setTimeout(resolve, typeof timeout === 'number' ? timeout : 0)
        )
        next()
      })
    }
  })
  return router
}
