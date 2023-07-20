import fastify from "fastify";
import {createPro , getAllPro ,getOnePro , deletePro, upDate} from './controller'



export default(fastify:any, optn:any, done:any)=>{
    fastify.post('/newProduct',createPro);
    fastify.get('/allPro',getAllPro);
    fastify.get('/getOnePro/:id',getOnePro);
    fastify.delete('/delPro/:id',deletePro);
    fastify.put('/upDate/:id', upDate)
    done()
};