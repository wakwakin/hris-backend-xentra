import { Hono } from "hono"
import { loggingMiddleware } from "./middleware/logger"

const app = new Hono()

app.use("*", loggingMiddleware)

app.get("/", (c) => {
  return c.json({ message: "root" })
})

export default app