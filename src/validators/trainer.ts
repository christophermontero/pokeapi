import Joi from 'joi';
import { ITrainer } from '../domain/models/trainer';

const validateTrainer = (trainer: ITrainer) => {
  const trainerSchema = Joi.object({
    name: Joi.string().min(2).max(80).required(),
    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/)
      .required(),
    team: Joi.string().valid('rojo', 'azul', 'amarillo').required(),
    nickname: Joi.string().min(2).max(80).optional()
  });

  return trainerSchema.validate(trainer);
};

export default validateTrainer;
