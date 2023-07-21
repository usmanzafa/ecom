import JWT from 'jsonwebtoken'

export const logInMiddle = async(req:any,res:any,next)=>{
    try {
        const decode = await JWT.verify(req.headers.authorization , process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.send({
            message:"Header Auth Error"
        })
    }
};