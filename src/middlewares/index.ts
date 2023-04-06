import { Request, Response, NextFunction } from 'express';
import httpResponses from '../../utils/constants/responses';

const validate =
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

export default validate;
