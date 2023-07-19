import bcrypt from "bcrypt"
import userModel from "./model"
import nodemailer from "nodemailer"

export const hashPassword = async(password:any)=>{
    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password,saltRound);
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
};


export const comparePassword = async(password,hashedPassword)=>{
    try {
        return await bcrypt.compare(password,hashedPassword);
    } catch (error) {
        console.log(error)
    }
};

// additional function for controller

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => userModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) => new userModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => userModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => userModel.findByIdAndUpdate(id, values);



export const sendVerifyMail = async(email,id)=>{
   try {
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:"musmanzafar153@gmail.com",
            pass:"odyymnjhvgpdijlv"
        }
    });

    const mailOption = {
      from: "musmanzafar153@gmail.com",
      to: email,
      subject: "Verification Email", // Subject line
      text: "Please note that this code assumes you have the JWT library installed and imported correctly. Additionally, ensure that you have the correct value set for process.env.JWT_SECRET in your environment variables." // plain text body
    };
    transporter.sendMail(mailOption, function(err,info){
      if(err){
        console.log(`email has not sent`)
      }else{
        console.log(`email sent Successfully`)
      }
    })
   } catch (error) {
    console.log(error)
   }
}




