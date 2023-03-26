import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const middleware = {
  // verify token
  verifyToken: async (req: Request | any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json('Authentication required. You are not authenticated!!!');
    }

    const token = authorization.split(' ')[1];

    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
          return res.status(403).json('Token is invalid');
        }
        req.user = user;
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json('Request is not authorized');
    }
  },

  verifyTokenAndAdmin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      middleware.verifyToken(req, res, () => {
        if (req.user?.id == req.params.id || req.params.admin) {
          next();
        } else {
          return res.status(403).json('You are not allowed to delete it');
        }
      });
    } catch (error) {
      return res.status(401).json('Request is not authorized');
    }
  },
};

export default middleware;
