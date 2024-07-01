import fastify from "fastify"
import { resolve } from 'node:path'
import { env } from 'node:process'

const server = fastify({
  logger: true,
})


server.register(import('@fastify/static'), {
  root: resolve('./packages/app/dist'),
  prefix: '/',
})

const connectedClients = new Set();


server
.register(import('@fastify/websocket'))
.register(async function (fastify) {
  fastify.get('/connect', { websocket: true }, (socket, req) => {
    socket.on('message', message => {
      fastify.websocketServer.clients.forEach(client => {
        client.send(message)
      })
    })

  })
})

.get("/", (req, res) => {
  res.sendFile('index.html')
})

.listen({
  host: env.VITE_HOST,
  port: parseFloat(env.VITE_PORT)
})
