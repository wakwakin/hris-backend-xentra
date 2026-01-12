import { Hono } from "hono"
import userRoutes from "./user"

export function registerRoutes(app: Hono) {
  app.route("/", userRoutes)
}