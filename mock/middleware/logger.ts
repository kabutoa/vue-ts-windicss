import Koa from 'koa'

const logger = async (ctx: Koa.Context, next: Koa.Next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

export default logger
