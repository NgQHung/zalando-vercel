import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import tokenController from './tokenController';
import validator from 'validator';
import { GlobalArr } from '../store/resfreshTokens';
import { AxiosError } from 'axios';

const authController = {
  register: async (req: Request, res: Response) => {
    const { password, firstName, email } = req.body;
    let errors;

    try {
      // hash the password
      if (!validator.isStrongPassword(password)) {
        errors = 'Password is not strong enough';
      }
      if (!validator.isEmail(email)) {
        errors = 'Email is not valid';
      }
      if (!email || !password) {
        errors = 'All field must not be empty';
      }
      const exist = await User.findOne({ email });

      if (exist) {
        errors = 'Email already in use';
      }
      if (exist || errors) {
        return res.status(404).json({
          message: errors,
          data: null,
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create new user
      const newUser = new User({
        firstName: firstName,
        email: email,
        password: hashedPassword,
      });

      // create an user on Mongoose
      const user = await newUser.save();
      return res.status(200).json({ data: user, message: 'You are registered successfully' });
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },
  login: async (req: Request, res: Response) => {
    // const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });
    try {
      if (!user) {
        return res
          .status(404)
          .json({ data: null, message: 'Zkontrolujte, zda jste zadali správnou e-mailovou adresu nebo heslo' });
      }
      const isPasswordMatch = user && user.password ? await bcrypt.compare(req.body.password, user.password) : false;
      if (!isPasswordMatch) {
        return res.status(404).json({ data: null, message: 'Incorrect password!' });
      }
      if (!user || !isPasswordMatch) {
        return res.status(404).json({ data: null, message: 'All field must not be empty' });
      }

      const admin = user && user.admin ? user.admin : false;
      const accessToken = tokenController.createAccessToken(user?.id, admin);
      const refreshToken = tokenController.createRefreshToken(user?.id, admin);
      GlobalArr.refreshTokens.push(refreshToken);

      // create refresh token on cookies
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });

      const { password, ...others }: any = user?._doc;

      return res.status(200).json({ ...others, accessToken });
    } catch (error) {
      const err = error as AxiosError;
      return res.status(500).json({
        data: null,
        message: 'Oops!!! Something went wrong.',
        error: err.message,
      });
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshToken');
      GlobalArr.refreshTokens = GlobalArr.refreshTokens.filter((token) => token !== req.cookies.refreshToken);
      return res.status(200).json('You are logged out successfully');
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

export default authController;
