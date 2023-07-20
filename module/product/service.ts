
import productSchema from './model'

// export const getProduct = () => productSchema.find();
// export const getProductById = (id: string) => productSchema.findById(id);
// export const createProduct = (values: Record<string, any>) =>
//   new productSchema(values).save().then((user) => user.toObject());
// export const deleteProductById = (id: string) =>
//   productSchema.findOneAndDelete({ _id: id });

export const updateProductById = (id: string, values: Record<string, any>) =>
  productSchema.findByIdAndUpdate(id, values);



  // Update product class
  export class UpdatePro {
    async updatedProduct(id: string, values: Record<string, any>) {
      try {
        const updated = await productSchema.findByIdAndUpdate(id,values);
        return updated;
      } catch (error) {
        console.log(error)
        throw error;
        
      }
    }
  };
  export const updateInstance = new UpdatePro();




  // Delete product by id
  export class DeletePro {
    async deleteProductById(id:string) {
      try {
        const del = await productSchema.findOneAndDelete({ _id: id });
        return del;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }
  };
  export const delInstance = new DeletePro();



  // create class for create product
  export class CreateProduct {
    async createProduct(values: Record<string, any>) {
      try {
        const create = await new productSchema(values).save();
        return create;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }
  };
  export const createInstance = new CreateProduct();



  // Create class for getting all products
  export class ProductService {
    async getProduct() {
      try {
        const products = await productSchema.find().lean(); // Use .lean() to convert to a plain JavaScript object
        return products;
      } 
      catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }
  };
  export const productServiceInstance = new ProductService();



  // create class for get product by id

  export class GetProbyId {
    async getProductById(id:string) {
      try {
        const getPro = await productSchema.findById(id).lean();
        return getPro;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    }
  };
  export const getProIdInstance = new GetProbyId();