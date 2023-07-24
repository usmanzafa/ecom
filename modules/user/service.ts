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

  // update user
  async update(id: string, values: Record<string, any>) {
    return await this.updateById(id,values)
 
  }

  // get all user
  async getAll() {
      return this.findAll()
  }

  // get email user
  async getUserByEmail(email: string) {
    const userEmail = new this.model({email});
    return this.getByEmail(userEmail);
  }

  //register User
  async create(values: Record<string, any>) {
    return await this.createOne(values);
  }

  // delete user by id
  async delete(id: string) {
    const del = new this.model({_id:id});
    return await this.deleteById(del);
  }
}
export const userInstance = new User(userModel);
