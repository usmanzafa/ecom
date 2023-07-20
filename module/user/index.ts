import fastify from "fastify";
import { regCont , loginCont , deleteCont} from "./controller";


export default(fastify:any, optn:any, done:any)=>{
    fastify.post('/register',regCont);
    fastify.post('/login',loginCont);
    fastify.delete('/delUser/:id',deleteCont);
    done()
};