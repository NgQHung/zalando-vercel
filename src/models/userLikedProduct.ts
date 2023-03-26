import express from 'express';
import mongoose from 'mongoose';
import ILikedProducts from '../interfaces/likedProducts';
// import { Products } from '../interfaces/products';

export interface ILikedProductsModel extends ILikedProducts, mongoose.Document {
  _id: any;
  id: any;
  _doc?: any;
}

const Schema = mongoose.Schema;

const userLikedProductSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  data: [
    {
      type: {
        id: { type: Number },
      },
    },
  ],
});

const LikedProductModel = mongoose.model<ILikedProductsModel>('userLikedProduct', userLikedProductSchema);

export default LikedProductModel;
