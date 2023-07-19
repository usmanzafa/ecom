import fastify from "fastify";
import { regCont , loginCont} from "./controller";


const router = (fastify:any, optn:any, done:any)=>{
    fastify.post('/register',regCont);
    fastify.post('/login',loginCont)
    done()
}

export default router;