import 'dotenv/config'
import { serve } from '@hono/node-server'
import app from './index'
import { connectMongo } from './db/mongo'

const port = 3000

const start = async () => {
  await connectMongo()

  const server = serve({
    fetch: app.fetch,
    port,
  })

  server.on('listening', () =>
    console.log(`Server running at http://localhost:${port}/`),
  )
}

start()
