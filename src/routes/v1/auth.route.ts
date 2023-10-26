import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import hashingPassword from '../../middlewares/hashing';
import validateToken from '../../middlewares/token';
import validate from '../../middlewares/validate';
import authValidator from '../../validators/auth.validator';

const auth = Router();

auth.get('/me', validateToken(), authController.profile);
auth.get('/signout', validateToken(), authController.signout);
auth.post(
  '/signup',
  [validate(authValidator.signup), hashingPassword()],
  authController.signup
);
auth.post('/signin', [validate(authValidator.signin)], authController.signin);

export default auth;
