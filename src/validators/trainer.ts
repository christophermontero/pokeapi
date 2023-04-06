import Joi from 'joi';
import { Trainer } from '../domain/models/trainer';

const validateTrainer = (trainer: Trainer) => {
  const trainerSchema = Joi.object({
    name: Joi.string().min(2).max(80).required(),
    password: Joi.string().min(5).max(16).required(),
    team: Joi.string().valid('rojo', 'azul', 'amarillo').required(),
    nickname: Joi.string().max(80).optional()
  });

  return trainerSchema.validate(trainer);
};

export default validateTrainer;
