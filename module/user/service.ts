import bcrypt from "bcrypt";
import userModel from "./model";

export const hashPassword = async (password: any) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log(error);
  }
};


// Create Class For user CRUD functionalty
class User {

  // update user
  async updateUser(id:string, values:Record<string,any>) {
    try {
      const update = await userModel.findByIdAndUpdate(id,values);
      return update;
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // get all user
  async getAllUser() {
    try {
      const user = await userModel.find();
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // get email user
  async getUserByEmail(email:string) {
    try {
      const getEmail = await userModel.findOne({email});
      return getEmail;
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  //register User
  async createUser(values: Record<string , any>){
    try {
      const user = await new userModel(values).save();
      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
 

  // delete user by id
  async deleteUserById(id:string) {
    try {
      const del = await userModel.findOneAndDelete({_id:id});
      return del;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

};
export const userInstance = new User();
