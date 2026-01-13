import { Hono } from 'hono'
import userRoutes from './user.route'

export function registerRoutes(app: Hono) {
  app.route('/', userRoutes)
}
