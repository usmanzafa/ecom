import fastify from "fastify";
import { ProductControllerInstance } from "./controller";
import { productValidateInstance } from "./schema";

// Define the routes using the controller instance methods with preHandler hook

export default (fastify: any, optn: any, done: any) => {
  fastify.post(
    "/create",
    { preHandler: productValidateInstance.productPreHandler },
    ProductControllerInstance.create
  );
  fastify.get("/all", ProductControllerInstance.getAll);
  fastify.get("/getOne/:id", ProductControllerInstance.getOne);
  fastify.delete("/delete/:id", ProductControllerInstance.delete);
  fastify.put("/update/:id", ProductControllerInstance.upDate);

  done();
};
