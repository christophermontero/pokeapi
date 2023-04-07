import Joi from 'joi';
import { ILogin } from '../domain/models/login';

const validateLogin = (login: ILogin) => {
  const loginSchema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z0-9]{2,50}$/)
      .required(),
    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/)
      .required()
  });

  return loginSchema.validate(login);
};

export default validateLogin;
