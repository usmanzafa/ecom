import joi from "joi";


// Joi scheema for register User

class UserValidate{
  registerPreHandler(req, res, done) {
    if (req.routerPath === "/register") {
      // Joi validation for "/register" route only
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
    }
    done();
  }
  
  ////////////////////////////////////////////////////////////////////
  
  // Joi Schema for login
  loginPrehandler(req, res, done) {
    if (req.routerPath === "/login") {
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
    }
    done();
  };
};



export const userValidateInstance = new UserValidate();
