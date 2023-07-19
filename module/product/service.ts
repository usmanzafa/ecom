import productSchema from './model'

export const getProduct = () => productSchema.find();
export const getProductById = (id: string) => productSchema.findById(id);
export const createProduct = (values: Record<string, any>) =>
  new productSchema(values).save().then((user) => user.toObject());
export const deleteProductById = (id: string) =>
  productSchema.findOneAndDelete({ _id: id });
export const updateProductById = (id: string, values: Record<string, any>) =>
  productSchema.findByIdAndUpdate(id, values);