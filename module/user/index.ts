import fastify from "fastify";
import { UserControllerInstance } from "./controller";

export default (fastify: any, optn: any, done: any) => {
  // PreHandler hook to be executed before the main route handlers
  function userPreHandler(request: any, reply: any, done: any) {
    console.log("User PreHandler");
    done();
  }


  // Define the routes using the controller instance methods
  fastify.post(
    "/register",
    { preHandler: userPreHandler },
    UserControllerInstance.regCont
  );
  fastify.post(
    "/login",
    { preHandler: userPreHandler },
    UserControllerInstance.loginCont
  );
  fastify.delete(
    "/delete/:id",
    { preHandler: userPreHandler },
    UserControllerInstance.deleteCont
  );
  fastify.get(
    "/all",
    { preHandler: userPreHandler },
    UserControllerInstance.allUserCont
  );
  fastify.put(
    "/update/:id",
    { preHandler: userPreHandler },
    UserControllerInstance.updateCont
  );

  done();
};
