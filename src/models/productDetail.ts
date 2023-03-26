import express from 'express';
import mongoose from 'mongoose';
import { Products } from '../interfaces/products';

const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  descript: { type: String },
  gender: { type: String },
  productCode: { type: String },
  pdpLayout: { type: String },
  brand: {
    type: {
      brandId: Number,
      name: String,
      description: String,
    },
  },
  variants: {
    type: [
      {
        id: Number,
        name: String,
        sizeId: Number,
        brandSize: String,
        isInStock: Boolean,
        isAvailable: Boolean,
        colour: String,
        colourWayId: String,
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
      },
    ],
  },
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
  media: {
    type: {
      images: [
        {
          url: String,
          colour: String,
          colourWayId: Number,
        },
      ],
    },
  },
  info: {
    type: {
      aboutMe: String,
      careInfo: String,
    },
  },
  productType: {
    type: {
      id: Number,
      name: String,
    },
  },

  // brandName: { type: String },
  // colour: { type: String },
  // imageUrl: { type: String },
  // isSellingFast: { type: Boolean },
  // // productCode: { type: Number },
  // productType: { type: String },
});

const ProductDetailModel = mongoose.model<Products>('product-detail', ProductDetailSchema);

export default ProductDetailModel;
