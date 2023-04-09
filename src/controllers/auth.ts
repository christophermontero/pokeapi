import { Router } from 'express';
import { AuthService } from '../domain/services/auth';
import { hashingPassword, validateBody } from '../middlewares';
import validateLogin from '../validators/login';
import validateTrainer from '../validators/trainer';

const auth = Router();

auth.post(
  '/signup',
  [validateBody(validateTrainer), hashingPassword()],
  AuthService.Signup
);

auth.post('/signin', [validateBody(validateLogin)], AuthService.Singin);

export default auth;
