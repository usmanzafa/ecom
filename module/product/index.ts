import fastify from "fastify";
import { ProductControllerInstance } from "./controller";

export default (fastify: any, optn: any, done: any) => {
  // PreHandler hook to be executed before the main route handlers
  function productPreHandler(request: any, reply: any, done: any) {
    console.log("Product PreHandler");
    done();
  }

  // Define the routes using the controller instance methods with preHandler hook
  fastify.post(
    "/new",
    { preHandler: productPreHandler },
    ProductControllerInstance.createProduct
  );
  fastify.get(
    "/all",
    { preHandler: productPreHandler },
    ProductControllerInstance.getAllProduct
  );
  fastify.get(
    "/getOne/:id",
    { preHandler: productPreHandler },
    ProductControllerInstance.getOneProduct
  );
  fastify.delete(
    "/delete/:id",
    { preHandler: productPreHandler },
    ProductControllerInstance.deleteProduct
  );
  fastify.put(
    "/update/:id",
    { preHandler: productPreHandler },
    ProductControllerInstance.upDateProduct
  );

  done();
};
