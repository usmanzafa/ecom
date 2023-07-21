import { productInstance } from "./service";
import joi from "joi";

//Class for controller function

class ProdutController {
  // create product ✅
  async createProduct(req: any, res: any) {
    try {
      const { name, price, description, category } = req.body;

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

      // post product
      const product = await productInstance.createProduct({
        name,
        price,
        description,
        category,
      });
      res.send({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //get all product ✅
  async getAllProduct(req: any, res: any) {
    try {
      // Call the getProduct method on the instance to retrieve products
      const products = await productInstance.getProduct();
      res.status(200).send({ products });
    } catch (error) {
      res.send({
        success: false,
        message: "GetAllProduct API Error",
        error,
      });
    }
  }

  // get one product ✅
  async getOneProduct(req: any, res: any) {
    try {
      const { id } = req.params;
      const product = await productInstance.getProductById(id);
      res.send({ product });
    } catch (error) {
      res
        .send({
          success: false,
          message: "Get One Product By Id Error",
        })
        .status(404);
      console.log(error);
    }
  }

  // delete product by id ✅
  async deleteProduct(req: any, res: any) {
    try {
      const { id } = req.params;
      const del = await productInstance.deleteProductById(id);
      res.send({
        success: true,
        del,
      });
    } catch (error) {
      res
        .send({
          success: false,
          message: "Delete Product By Id Error",
        })
        .status(404);
      console.log(error);
    }
  }

  //update product ✅
  async upDateProduct(req: any, res: any) {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    try {
      const updatedProduct = await productInstance.updatedProduct(id, {
        name,
        price,
        description,
        category,
      });
      res.send({ updatedProduct });
    } catch (error) {
      res.status(500).send({ message: "Server error" });
    }
  }
}

export const ProductControllerInstance = new ProdutController();
