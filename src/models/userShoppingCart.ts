import express from 'express';
import mongoose from 'mongoose';
import IShoppingCart from '../interfaces/shoppingCart';
// import { Products } from '../interfaces/products';

export interface IShoppingCartModel extends IShoppingCart, mongoose.Document {
  _id: any;
  id: any;
  _doc?: any;
}

const Schema = mongoose.Schema;

const userShoppingCart = new Schema({
  // id: { type: String },
  data: {
    type: [
      {
        id: { type: Number },
        brand: { type: String },
        name: { type: String },
        imageUrl: { type: String },
        currentPrice: { type: Number },
        previousPrice: { type: Number },
        isFavorite: { type: Boolean },
        amount: { type: Number },
        size: { type: String },
        totalProduct: { type: Number },
      },
    ],
  },
});

const ProductShoppingCartModel = mongoose.model<IShoppingCartModel>('userShoppingCart', userShoppingCart);

export default ProductShoppingCartModel;
