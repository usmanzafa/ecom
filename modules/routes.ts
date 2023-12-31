import fastify from "fastify";
import user from "./user/index";
import product from "./product/index";

const router = (fastify: any, optn: any, done: any) => {
  fastify.register(user, { prefix: "/user" }),
    fastify.register(product, { prefix: "/product" });

  done();
};

export default router;
