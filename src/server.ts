import 'dotenv/config'
import { serve } from '@hono/node-server'
import app from './index'
import { connectMongo } from './db/mongo'

const port = Number(process.env.PORT) || 3000
const host = process.env.HOST || '0.0.0.0'

const start = async () => {
  await connectMongo()

  const server = serve({
    fetch: app.fetch,
    port,
    hostname: host,
  })

  server.on('listening', () =>
    console.log(`Server running at http://${host}:${port}/`),
  )
}

start()
