import fastify from 'fastify'
import dotenv from 'dotenv'
import dbConnection from './utils/db'
import router from './module/user'


const server = fastify()
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

