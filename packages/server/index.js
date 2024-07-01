import fastify from "fastify"
import fastifyIO from "fastify-socket.io"
import { resolve } from 'node:path'

const server = fastify({
  logger: true
})
server.register(fastifyIO)


server.register(import('@fastify/static'), {
  root: resolve('../app/dist'),
  prefix: '/',
})

server.get("/", (req, res) => {
  server.io.emit("hello")
  res.sendFile('index.html')
})

server.ready().then(() => {
  // we need to wait for the server to be ready, else `server.io` is undefined
  server.io.on("connection", (socket) => {
    // ...
  })
})

server.listen({ port: 3000 })