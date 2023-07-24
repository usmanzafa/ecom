import productSchema from "./model";
import BaseService from "../../base/baseServices";

// Create a Class For Product CRUD API
class Product extends BaseService {

  // Update product class
  async update(id: string, values: Record<string, any>) {
    return await this.updateById(id,values)
  }

  //// Delete product by id
  async delete(id: string) {
    const del = new this.model({_id:id});
    return await this.deleteById(del)
  }

  //create Product
  async create(values: Record<string, any>) {
    return await this.createOne(values)
  }

  // getting All Product
  async getAll() {
    return await this.findAll();
  }

  //get product by id
  async getOneById(id: string) {
   const getoneId = new this.model({_id:id});
   return await this.getById(getoneId)
  }
}
export const productInstance = new Product(productSchema);
