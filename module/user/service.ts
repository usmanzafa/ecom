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

// additional function for controller

export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  userModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate(id, values);

// sending mail by nodemailer
