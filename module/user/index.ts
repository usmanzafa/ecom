import fastify from "fastify";
import { regCont , loginCont , deleteCont , allUserCont , updateCont } from "./controller";


export default(fastify:any, optn:any, done:any)=>{
    fastify.post('/register',regCont);
    fastify.post('/login',loginCont);
    fastify.delete('/delUser/:id',deleteCont);
    fastify.get('/allUser',allUserCont);
    fastify.put('/updateUser/:id',updateCont);
    done()
};