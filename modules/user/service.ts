import bcrypt from "bcrypt";
import userModel from "./model";
import BaseService from "../../base/baseServices";

// Create Class For user CRUD functionalty
class User extends BaseService {
  // hashPassword
  async hashPassword(password: any) {
    try {
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(password, saltRound);
      return hashedPassword;
    } catch (error) {
      console.log(error);
    }
  }

  // compare password
  async comparePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.log(error);
    }
  }
}
export const userInstance = new User(userModel);
