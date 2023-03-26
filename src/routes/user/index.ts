import express from 'express';
import userController from '../../controllers/userController';
// import userProductController from "../../controllers/";
import middleware from '../../middlewares/requireAuth';

const userRouter = express.Router();

// get all users
userRouter.get('/all', middleware.verifyToken, userController.getAllUsers);

// delete a user by ID
userRouter.delete('/:id', middleware.verifyTokenAndAdmin, userController.deleteUser);

// post data of user
userRouter.post('/:id/shopping-cart', middleware.verifyToken, userController.addProductToShoppingCart);
userRouter.post('/:id/liked', middleware.verifyToken, userController.addProductToLiked);

// post data address delivery user
userRouter.post('/:id/address-delivery', middleware.verifyToken, userController.addAddressDeliveryUser);

// get data address delivery user
userRouter.get('/:id/address-delivery/info', middleware.verifyToken, userController.getAddressDeliveryById);

// post data purchased products && method payment user
userRouter.post('/:id/purchased-products/post', middleware.verifyToken, userController.postPurchasedProductsById);

// post data added products user
// userRouter.post('/:id/added-products/post', middleware.verifyToken, userProductController.addedProduct);

// get data purchased products && method payment user
userRouter.get('/:id/purchased-products', middleware.verifyToken, userController.getPurchasedProductsById);

// get data of user
userRouter.get('/:id/shopping-cart/products', middleware.verifyToken, userController.getProductsFromShoppingCartById);
userRouter.get('/:id/liked/products', middleware.verifyToken, userController.getProductsFromLiked);

export default userRouter;
