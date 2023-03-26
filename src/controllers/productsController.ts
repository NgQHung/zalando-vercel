import ProductModel from '../models/products';
import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import ProductDetailModel from '../models/productDetail';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  let products;
  try {
    products = await ProductModel.find({});
    return res.json(products);
  } catch (error) {
    const err = error as AxiosError;
    return res.status(500).json({
      data: null,
      message: 'Oops!!! Something went wrong.',
      error: err.message,
    });
  }
};
export const getProductsDetail = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idToNumber = Number(id);
  let product;
  try {
    const existingProduct = await ProductDetailModel.findOne({ id: idToNumber });
    product = existingProduct;
    return res.status(200).json(product);
  } catch (error) {
    const err = error as AxiosError;
    return res.status(500).json({
      data: null,
      message: 'Oops!!! Something went wrong.',
      error: err.message,
    });
  }
};
