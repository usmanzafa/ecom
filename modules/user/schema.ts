import joi from "joi";


// Joi scheema for register User

class UserValidate{


  registerPreHandler(req, res, done) {
      //validation
      const schema = joi.object({
        lastName: joi.string().required(),
        firstName: joi.string().required(),
        email: joi.string().email().lowercase().required(),
        password: joi.string().min(5).required(),
      });
     
      done();
    }
  
  ////////////////////////////////////////////////////////////////////
  
  // Joi Schema for login
  loginPrehandler(req, res, done) {
      //validation
      const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(10).required(),
      });
  
    done();
  };
};



export const userValidateInstance = new UserValidate();
