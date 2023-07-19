import { getUserByEmail, createUser, comparePassword } from "./service";
import { sendVerifyMail } from "../../utils/utils";
// import loginSchema from './validation_schema'
import joi from "joi";
import JWT from "jsonwebtoken";
import { hashPassword } from "./service";

export const regCont = async (req: any, res: any) => {
  try {
    const { lastName, firstName, email, password } = req.body;

    //validation
    const schema = joi.object({
      lastName: joi.string().required(),
      firstName: joi.string().required(),
      email: joi.string().email().lowercase().required(),
      password: joi.string().min(5).required(),
    });
    let result = schema.validate(req.body);
    if (!result) {
      return res.send({
        result,
      });
    }

    // check already register
    const chk = await getUserByEmail(email);
    if (chk) {
      return res.send({
        success: false,
        message: "already register",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // save user
    const user = await createUser({
      lastName,
      firstName,
      email,
      password: hashedPassword,
    });
    res.send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// login
export const loginCont = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    //validation
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(10).required(),
    });
    let result = schema.validate(req.body);
    if(!result){
      return res.send({
        result
      })
    }
    

    // check user register or not
    const user = await getUserByEmail(email);
    if (!user) {
      return res.send({
        success: false,
        message: "Please Register And then Login",
      });
    }

    // check password
    const chk = await comparePassword(password, user.password);
    if (!chk) {
      return res.send({
        success: false,
        message: "invalid password",
      });
    }

    // JWT sign
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4000s",
    });
    if (user) {
      sendVerifyMail(email, user._id);
      res.send({
        success: true,
        token,
      });
    } else {
      res.send({
        success: false,
        message: "Error in user reg",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
