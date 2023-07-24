import joi from "joi";


// Joi scheema for register User

class ProductValidate{
  productPreHandler(req:any, res:any, done:any) {
    if (req.routerPath === "/create") {
      //validation
      const schema = joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().min(2).required(),
        category: joi.string().required(),
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
};


export const productValidateInstance = new ProductValidate();
