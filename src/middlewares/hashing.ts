import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import logger from '../config/logger';
import httpResponses from '../constants/responses';

const hashingPassword =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body = { ...req.body, hashedPassword };
      return next();
    } catch (error: any) {
      logger.error(error.message);

      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        code: httpResponses.INTERNAL_ERROR.code,
        message: httpResponses.INTERNAL_ERROR.message
      });
    }
  };

export default hashingPassword;
