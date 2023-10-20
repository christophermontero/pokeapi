import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import httpResponses from '../constants/responses';

const validateToken =
  () => (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        code: httpResponses.UNAUTHORIZED.code,
        message: httpResponses.UNAUTHORIZED.message
      });
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      req.body.user = decoded;

      return next();
    } catch (error: any) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        code: httpResponses.UNAUTHORIZED.code,
        message: httpResponses.UNAUTHORIZED.message
      });
    }
  };

export default validateToken;
