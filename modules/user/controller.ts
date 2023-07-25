import { userInstance } from "./service";
import { utilsInstance } from "../../utils/utils";
import BaseController from "../../base/baseController";
import userSchema from './model'
import JWT from "jsonwebtoken";

// create a class for user controller
class UserController extends BaseController {
  //register
  async register(req: any, res: any) {
    try {
      const { lastName, firstName, email, password } = req.body;

      // check already register
      const chk = await userInstance.getByEmail(email);
      if (chk) {
        return res.send({
          success: false,
          message: "already register",
        });
      }

      // hash password
      const hashedPassword = await userInstance.hashPassword(password);

      // save user
      const user = await userInstance.createOne({
        lastName,
        firstName,
        email,
        password:hashedPassword,
      });
      res.send({
        success: true,
        user,
      });
    } catch (error) {
      // console.log(error);
      res.send({error})
    }
  }

  // login
  async login(req: any, res: any) {
    try {
      const { email, password } = req.body;

      // check user register or not
      const user = await userInstance.getByEmail(email);
      if (!user) {
        return res.send({
          success: false,
          message: "Please Register And then Login",
        });
      }

      // check password
      const chk = await userInstance.comparePassword(password, user.password);
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
        utilsInstance.sendVerifyMail(email);
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
  }

  //update user
  async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const { lastName, firstName, email, password } = req.body;

      const updt = await userInstance.updateById(id, {
        lastName,
        firstName,
        email,
        password,
      });
      res.send({
        success: true,
        updt,
      });
    } catch (error) {
      res.send({
        success: false,
        message: "update API error",
      });
    }
  }
}

export const UserControllerInstance = new UserController(userSchema,userInstance);
