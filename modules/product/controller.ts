import { productInstance } from "./service";
import BaseController from "../../base/baseController";
import productSchema from "./model";

//Class for controller function

class ProdutController extends BaseController {
  // create product ✅
  async create(req: any, res: any) {
    try {
      const { name, price, description, category } = req.body;

      // post product
      const product = await productInstance.createOne({
        name,
        price,
        description,
        category,
      });
      return res.send(product);
    } catch (error) {
      return this.responses.sendError(error);
    }
  }

  // update product ✅
  async upDate(req: any, res: any) {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    try {
      const updatedProduct = await productInstance.updateById(id, {
        name,
        price,
        description,
        category,
      });
      return res.send(updatedProduct);
    } catch (error) {
      return this.responses.sendError(error);
    }
  }
}

export const ControllerInstance = new ProdutController(
  productSchema,
  productInstance
);
