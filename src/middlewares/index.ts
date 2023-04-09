import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import httpResponses from '../constants/responses';
import logger from '../utils/logger';

export const validateBody =
  (validator: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error)
      return res.status(400).json({
        code: httpResponses.BAD_REQUEST.code,
        message: httpResponses.BAD_REQUEST.message,
        detail: error
      });
    next();
  };

export const validateQuery =
  (validator: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.query);
    if (error)
      return res.status(400).json({
        code: httpResponses.BAD_REQUEST.code,
        message: httpResponses.BAD_REQUEST.message,
        detail: error
      });
    next();
  };

export const hashingPassword =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body = { ...req.body, hashedPassword };
      next();
    } catch (error: any) {
      logger.Danger(`${error.message}`);

      return res.status(500).json({
        code: httpResponses.INTERNAL_ERROR.code,
        message: httpResponses.INTERNAL_ERROR.message
      });
    }
  };
