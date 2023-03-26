import express from 'express';
import { getAllProducts, getProductsDetail } from '../controllers/productsController';
import authRouter from './auth';
import userRouter from './user';
// import authRouter

const router = express.Router();

// products
router.get('/products', getAllProducts);
router.get('/product/:id', getProductsDetail);

// authentication
router.use('/v1/auth', authRouter);

// user
router.use('/v1/user', userRouter);

export default router;
