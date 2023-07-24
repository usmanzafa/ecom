import fastify from "fastify";
import dotenv from "dotenv";
import dbConnection from "./utils/db";
import router from "./module/routes";
import cors from "@fastify/cors";
import compress from "@fastify/compress";

const server = fastify({ logger: true });
server.register(cors);
server.register(compress, { global: false });

/////////////////////////////////////
function createYourCustomBrotliCompress() {
  throw new Error("Function not implemented.");
}
function createYourCustomGzip() {
  throw new Error("Function not implemented.");
}
function createYourCustomDeflate() {
  throw new Error("Function not implemented.");
}
server.get("/custom-route", {
  compress: {
    inflateIfDeflated: true,
    threshold: 128,
    zlib: {
      createBrotliCompress: () => createYourCustomBrotliCompress(),
      createGzip: () => createYourCustomGzip(),
      createDeflate: () => createYourCustomDeflate(),
    },
  },
  /////////////////////////////

  handler: async (req, reply) => {
    // Route handler logic
    reply.send({ message: "This response is compressed!" });
  },
});

// PreHandler Hook
server.addHook("preHandler", (request, reply, done) => {
  console.log("Received request:", request.raw.method, request.raw.url);
  done();
});
dotenv.config();
dbConnection();
server.register(router);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
