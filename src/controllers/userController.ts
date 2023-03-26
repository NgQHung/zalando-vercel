import express, { Request, Response } from 'express';
import ShoppingCart from '../models/userShoppingCart';
import AddressDelivery from '../models/userAddressDelivery';
import LikedProductModel from '../models/userLikedProduct';
import User from '../models/user';
import PurchasedProducts from '../models/userPurchasedProducts';
import { AxiosError } from 'axios';

const userController = {
  // get all users
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const allUsers = await User.find();
      return res.status(200).json({ data: allUsers });
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },

  // delete an user
  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      const user = await User.findById(id);
      return res.status(200).json('User is deleted successfully');
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },

  addAddressDeliveryUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
      const existingId = await AddressDelivery.findOne({ _id: id });
      let info;
      if (existingId) {
        info = await AddressDelivery.updateOne(
          {
            _id: id,
          },
          { $set: { data: data } }
        );
      } else {
        info = await AddressDelivery.create({
          _id: id,
          data: data,
        });
      }

      // return res.status(200).json(req.body);
      return res.status(200).json(existingId);
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },

  addProductToShoppingCart: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
      const existingId = await ShoppingCart.findOne({ _id: id });
      let product;
      if (existingId) {
        product = await ShoppingCart.updateOne(
          {
            _id: id,
          },
          // for push object data to an array
          // {
          //   $push: { data: data },
          // }
          { data: data }
        );
      } else {
        product = await ShoppingCart.create({
          _id: id,
          data: data,
        });
      }

      return res.status(200).json(data);
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },

  addProductToLiked: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
      const existingId = await LikedProductModel.findOne({ _id: id });
      let product;
      if (existingId) {
        product = await LikedProductModel.updateOne(
          {
            _id: id,
          },
          { data: data }
        );
      } else {
        product = await LikedProductModel.create({
          _id: id,
          data: data,
        });
      }

      return res.status(200).json(product);
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },

  getAddressDeliveryById: async (req: Request, res: Response) => {
    const { id } = req.params;
    // let newObj = {}
    try {
      const all = await AddressDelivery.findOne({ _id: id });
      // if(AddressDelivery?._id )
      if (!all) {
        return res.status(200).json({
          _id: id,
          data: {},
        });
      } else return res.status(200).json(all);
      // return res.status(200).json(all);
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },

  getProductsFromShoppingCartById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const all = await ShoppingCart.findOne({ _id: id });
      if (all) {
        return res.status(200).json(all);
      } else {
        return res.status(200).json({ _id: id, data: [] });
      }
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        _id: id,
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },
  getProductsFromLiked: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const all = await LikedProductModel.findOne({ _id: id });
      if (all) {
        return res.status(200).json(all);
      } else {
        return res.status(200).json({ _id: id, data: [] });
      }
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },

  postPurchasedProductsById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const existingId = await PurchasedProducts.findOne({ _id: id });
      let product;
      if (existingId) {
        product = await PurchasedProducts.findOneAndUpdate(
          {
            _id: id,
          },
          // for push object data to an array
          {
            $push: {
              data: data,
            },
          }
          // { data: data }
        );
      } else {
        product = await PurchasedProducts.create({
          _id: id,
          data,
        });
      }

      // return res.status(200).json(req.body);
      return res.status(200).json({
        _id: id,
        data: product,
        message: `Info address delivery of user is updated successfully`,
      });
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
    // return res.status(200).json(data);
  },

  getPurchasedProductsById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const all = await PurchasedProducts.findOne({ _id: id });
      if (!all) {
        return res.status(200).json({
          _id: id,
          data: [],
        });
      } else return res.status(200).json(all);
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },
};

export default userController;
