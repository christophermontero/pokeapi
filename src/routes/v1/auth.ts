import { Request, Response, Router } from 'express';
import validate from '../../middlewares';
import validateTrainer from '../../validators/trainer';
const auth = Router();

auth.post('/', [validate(validateTrainer)], (req: Request, res: Response) => {
  const trainer = req.body;
  return res.status(200).json(trainer);
});

export default auth;
