import { Router } from 'express';
import { AuthService } from '../domain/services/auth';
import { hashingPassword, validate } from '../middlewares';
import validateLogin from '../validators/login';
import validateTrainer from '../validators/trainer';

const auth = Router();

auth.post(
  '/signup',
  [validate(validateTrainer), hashingPassword()],
  AuthService.Signup
);

auth.post('/signin', [validate(validateLogin)], AuthService.Singin);

export default auth;
