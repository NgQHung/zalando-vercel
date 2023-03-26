import express from 'express';
import mongoose from 'mongoose';
import Joi from 'joi';
import { Products } from '../interfaces/products';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  brandName: { type: String },
  colour: { type: String },
  id: { type: Number },
  imageUrl: { type: String },
  isSellingFast: { type: Boolean },
  name: { type: String },
  price: {
    type: {
      currency: String,
      current: {
        value: Number,
        text: String,
      },
      previous: {
        value: Number || null,
        text: String,
      },
      isMarkedDown: Boolean,
      isOutletPrice: Boolean,
    },
  },
  productCode: { type: Number },
  productType: { type: String },
});

const ProductModel = mongoose.model<Products>('products', ProductSchema);

export default ProductModel;
