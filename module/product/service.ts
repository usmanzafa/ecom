import productSchema from "./model";


// Create a Class For Product CRUD API
class Product {
  // Update product class
  async updatedProduct(id: string, values: Record<string, any>) {
    try {
      const updated = await productSchema.findByIdAndUpdate(id, values);
      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //// Delete product by id
  async deleteProductById(id: string) {
    try {
      const del = await productSchema.findOneAndDelete({ _id: id });
      return del;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  //create Product
  async createProduct(values: Record<string, any>) {
    try {
      const create = await new productSchema(values).save();
      return create;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  // getting All Product
  async getProduct() {
    try {
      const products = await productSchema.find().lean(); // Use .lean() to convert to a plain JavaScript object
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  //get product by id
  async getProductById(id: string) {
    try {
      const getPro = await productSchema.findById(id).lean();
      return getPro;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
};
export const updateInstance = new Product();
export const delInstance = new Product();
export const createInstance = new Product();
export const productServiceInstance = new Product();
export const getProIdInstance = new Product();
