import { userInstance } from "./service";
import { utilsInstance } from "../../utils/utils";
import joi from "joi";
import JWT from "jsonwebtoken";

// create a class for user controller
class UserController {
  //register
  async regCont(req: any, res: any) {
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
      const chk = await userInstance.getUserByEmail(email);
      if (chk) {
        return res.send({
          success: false,
          message: "already register",
        });
      }

      // hash password
      const hashedPassword = await userInstance.hashPassword(password);

      // save user
      const user = await userInstance.createUser({
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
  }

  // login
  async loginCont(req: any, res: any) {
    try {
      const { email, password } = req.body;

      //validation
      const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(10).required(),
      });
      let result = schema.validate(req.body);
      if (!result) {
        return res.send({
          result,
        });
      }

      // check user register or not
      const user = await userInstance.getUserByEmail(email);
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

  // delete user
  async deleteCont(req: any, res: any) {
    try {
      const { id } = req.params;
      const delUser = await userInstance.deleteUserById(id);
      res.send({ delUser });
    } catch (error) {
      res.send({
        success: false,
        message: "Error in delete user API",
        error,
      });
    }
  }

  // get all user
  async allUserCont(req: any, res: any) {
    try {
      const user = await userInstance.getAllUser();
      res.send({
        success: true,
        user,
      });
    } catch (error) {
      res.send({
        success: false,
        message: "Get All User Api Error",
      });
    }
  }

  //update user
  async updateCont(req: any, res: any) {
    try {
      const { id } = req.params;
      const { lastName, firstName, email, password } = req.body;

      const updt = await userInstance.updateUser(id, {
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

export const UserControllerInstance = new UserController();
