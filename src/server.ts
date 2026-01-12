import { serve } from "@hono/node-server"
import app from "./index"

const port = 3000;

const server = serve({
    fetch: app.fetch,
    port
})

server.on("listening", () => console.log(`Server running at http://localhost:${port}/`))