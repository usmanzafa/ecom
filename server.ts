import fastify from 'fastify'
import dotenv from 'dotenv'
import dbConnection from './utils/db'
import router from './module/routes'
import cors from '@fastify/cors'
import compress from '@fastify/compress'


const server = fastify({ logger: true });
server.register(cors);
server.register(compress, { global: false });
// PreHandler Hook
server.addHook('preHandler', (request, reply, done) => {
  console.log('Received request:', request.raw.method, request.raw.url);
  done();
});
dotenv.config();
dbConnection();
server.register(router);



server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

