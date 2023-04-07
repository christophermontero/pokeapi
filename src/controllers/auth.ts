import { Router } from 'express';
import validate from '../middlewares';
import validateTrainer from '../validators/trainer';
import { TrainerService } from '../domain/services/trainer';

const auth = Router();

auth.post('/', [validate(validateTrainer)], TrainerService.Signup);

export default auth;
