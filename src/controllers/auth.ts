import { Router } from 'express';
import { validate, hashingPassword } from '../middlewares';
import validateTrainer from '../validators/trainer';
import { TrainerService } from '../domain/services/trainer';

const auth = Router();

auth.post(
  '/signup',
  [validate(validateTrainer), hashingPassword()],
  TrainerService.Signup
);

export default auth;
