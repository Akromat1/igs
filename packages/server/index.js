// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
import { readFile } from 'node:fs/promises'

const app = Fastify({
  logger: true
})

app.get('/client.js', function(req, res) {
  reply.header('Content-Type', 'application/javascript')
  return readFile('./client.js', 'utf-8')
})

// Declare a route
app.get('/', function (request, reply) {
  reply.header('Content-Type', 'text/html')
  return readFile('./index.html', 'utf-8')
})

// Run the server!
app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})