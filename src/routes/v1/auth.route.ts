import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import hashingPassword from '../../middlewares/hashing';
import validate from '../../middlewares/validate';
import authValidation from '../../validators/auth.validation';

const auth = Router();

auth.post(
  '/signup',
  [validate(authValidation.signup), hashingPassword()],
  authController.signup
);
auth.post('/signin', [validate(authValidation.signin)], authController.signin);

export default auth;
