import type { MiddlewareHandler } from "hono"
import { logger } from "../services/logger"

export const loggingMiddleware: MiddlewareHandler = async (c, next) => {
    const start = Date.now()

    await next()

    const ms = Date.now() - start

    logger.info({
        method: c.req.method,
        path: c.req.path,
        status: c.res.status,
        duration: `${ms}ms`
    })
}