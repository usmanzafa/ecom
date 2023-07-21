import fastify from "fastify";
import { UserControllerInstance } from "./controller";


export default(fastify:any, optn:any, done:any)=>{
    fastify.post('/register',UserControllerInstance.regCont);
    fastify.post('/login',UserControllerInstance.loginCont);
    fastify.delete('/delete/:id',UserControllerInstance.deleteCont);
    fastify.get('/all',UserControllerInstance.allUserCont);
    fastify.put('/update/:id',UserControllerInstance.updateCont);
    done()
};