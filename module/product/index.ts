import fastify from "fastify";
import { ProductControllerInstance } from "./controller";

export default (fastify: any, optn: any, done: any) => {
  fastify.post("/new", ProductControllerInstance.createProduct);
  fastify.get("/all", ProductControllerInstance.getAllProduct);
  fastify.get("/getOne/:id", ProductControllerInstance.getOneProduct);
  fastify.delete("/delete/:id", ProductControllerInstance.deleteProduct);
  fastify.put("/update/:id", ProductControllerInstance.upDateProduct);
  done();
};
