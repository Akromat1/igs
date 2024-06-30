const { NODE_ENV = "development", VITE_PORT = 3000 } = process.env;
console.time("Start");

import cors from '@fastify/cors'
import { Server } from 'socket.io';

let address;
if (NODE_ENV === "production") {
  // In production, simply start up the fastify server.
  const { app } = await import("./dist/index.js");
  address = await app.listen({ port: VITE_PORT });
} else {
  // In dev we'll start a Vite dev server in middleware mode,
  // and forward requests to our fastify server.
  const { once } = await import("events");
  const { createServer } = await import("vite");
  const devServer = await createServer({
    appType: "custom",
    server: { cors: false, middlewareMode: true },
  });
  const server = devServer.middlewares
    .use(async (req, res, next) => {
      try {
        const { app } = await devServer.ssrLoadModule("./src/index.js");
        await app.ready();
        app.routing(req, res);
      } catch (err) {
        return next(err);
      }
    })
    .listen(VITE_PORT);

  await once(server, "listening");
  
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      console.info(`msg`, msg)
      io.emit('get message', msg)
    });
  });
  address = `http://${process.env.VITE_HOST}:${server.address().port}`;
}

console.timeEnd("Start");
console.log(`Env: ${NODE_ENV}`);
console.log(`Address: ${address}`);
