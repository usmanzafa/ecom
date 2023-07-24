import { productInstance } from "./service";
import joi from "joi";

//Class for controller function

class ProdutController {
  // create product ✅
  async create(req: any, res: any) {
    try {
      const { name, price, description, category } = req.body;

      // post product
      const product = await productInstance.create({
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
  async getAll(req: any, res: any) {
    try {
      // Call the getProduct method on the instance to retrieve products
      const products = await productInstance.getAll();
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
  async getOne(req: any, res: any) {
    try {
      const { id } = req.params;
      const product = await productInstance.getOneById(id);
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
  async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      const del = await productInstance.delete(id);
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
  async upDate(req: any, res: any) {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    try {
      const updatedProduct = await productInstance.update(id, {
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
