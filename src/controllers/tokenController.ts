import jwt from 'jsonwebtoken';
import express, { Response, Request, NextFunction } from 'express';
import { GlobalArr } from '../store/resfreshTokens';
import { AxiosError } from 'axios';

const tokenController = {
  // create access token
  createAccessToken: (id: string, admin: boolean) => {
    return jwt.sign({ id, admin }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' });
  },
  // create refresh token
  createRefreshToken: (id: string, admin: boolean) => {
    return jwt.sign({ id, admin }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '3d' });
  },

  // refresh token
  requireRefreshToken: async (req: Request, res: Response, next: NextFunction) => {
    // get refresh token from user
    const refreshToken = req.cookies.refreshToken;

    try {
      if (!refreshToken) return res.status(401).json({ data: null, msg: 'You are not authenticated' });

      if (!GlobalArr.refreshTokens.includes(refreshToken))
        return res.status(403).json({ data: null, msg: 'Refresh token is invalid' });

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
          return res.status(401).json(err);
        }
        GlobalArr.refreshTokens = GlobalArr.refreshTokens.filter((token) => token !== refreshToken);
        const newRefreshToken = tokenController.createRefreshToken(user.id, user.admin);
        const newAccessToken = tokenController.createAccessToken(user.id, user.admin);
        GlobalArr.refreshTokens.push(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict',
        });
        return res.status(200).json({ accessToken: newAccessToken });
      });
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

export default tokenController;
