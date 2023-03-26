import express from 'express';
import authController from '../../controllers/authControllers';
import tokenController from '../../controllers/tokenController';
import middleware from '../../middlewares/requireAuth';

const authRouter = express.Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/logout', middleware.verifyToken, authController.logout);

authRouter.post('/refresh', tokenController.requireRefreshToken);

export default authRouter;
