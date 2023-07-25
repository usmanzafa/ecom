import fastify from "fastify";
import { ControllerInstance } from "./controller";
import { productValidateInstance } from "./schema";

// Define the routes using the controller instance methods with preHandler hook

export default (fastify: any, optn: any, done: any) => {
  fastify.post(
    "/create",
    { preHandler: productValidateInstance.productPreHandler },
    ControllerInstance.create
  );
  fastify.get("/all", ControllerInstance.getAll);
  fastify.get("/getOne/:id", ControllerInstance.getOne);
  fastify.delete("/delete/:id", ControllerInstance.deleteById);
  fastify.put("/update/:id", ControllerInstance.upDate);

  done();
};
