import {
  createProduct,
  getProduct,
  getProductById,
  deleteProductById,
} from "./service";
import productSchema from "./model";
import joi from "joi";

// create product
export const createPro = async (req: any, res: any) => {
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
    const product = await createProduct({ name, price, description, category });
    res.send({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

//get all product
export const getAllPro = async (req: any, res: any) => {
  try {
    const getOne = await getProduct();
    res.send({
      success: true,
      getOne,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "GetOneProduct API Error",
      error,
    });
  }
};

// get one product
export const getOnePro = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
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
};

// delete product by id
export const deletePro = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const del = await deleteProductById(id);
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
};

//update product
export const upDate = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;

  try {
    // Find the product by ID
    const product = await productSchema.findById(id);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Update the product fields
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;

    // Save the updated product
    const updatedProduct = await product.save();

    res.send({ updatedProduct });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

// search by name
