import fastify from "fastify";
import { UserControllerInstance } from "./controller";
import {userValidateInstance} from "./schema";

export default (fastify: any, optn: any, done: any) => {
  // Define the "/register" route using the controller instance method
  fastify.post(
    "/register",
    { preHandler: userValidateInstance.registerPreHandler },
    UserControllerInstance.register
  );
  fastify.post(
    "/login",
    { preHandler: userValidateInstance.loginPrehandler },
    UserControllerInstance.login
  );
  fastify.delete("/delete/:id", UserControllerInstance.delete);
  fastify.get("/all", UserControllerInstance.allUser);
  fastify.put("/update/:id", UserControllerInstance.update);

  done();
};
