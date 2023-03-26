import express from 'express';
import mongoose from 'mongoose';
import IAddressDelivery from '../interfaces/addressDelivery';
// import { Products } from '../interfaces/products';

export interface IAddressDeliveryModel extends IAddressDelivery, mongoose.Document {
  _id: any;
  id: any;
  _doc?: any;
}

const Schema = mongoose.Schema;

const userAddressDelivery = new Schema({
  _id: { type: Schema.Types.ObjectId },
  firstName: { type: Schema.Types.Mixed, required: true },
  lastName: { type: Schema.Types.Mixed, required: true },
  address: { type: Schema.Types.Mixed, required: true },
  info: { type: Schema.Types.Mixed },
  psc: { type: Schema.Types.Mixed, required: true },
  city: { type: Schema.Types.Mixed, required: true },
});

const AddressDeliveryModel = mongoose.model<IAddressDeliveryModel>('userAddressDelivery', userAddressDelivery);

export default AddressDeliveryModel;
