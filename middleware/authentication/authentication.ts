import JWT from "jsonwebtoken"
export const loginMiddle = async(req:any,res:any,next:any)=>{
    try {
        const decode = await JWT.verify()
    } catch (error) {
        console.log(error)
    }
}