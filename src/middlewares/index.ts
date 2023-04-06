import { Request, Response, NextFunction } from 'express';

const validate =
  (validator: any) => (req: Request, res: Response, next: NextFunction) => {
    const error = validator(req.body);
    if (error)
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'Bad request',
        detail: error
      });
    next();
  };

export default validate;
