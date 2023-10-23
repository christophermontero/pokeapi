import Joi from 'joi';

const signup = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/
        )
        .required(),
      team: Joi.string().valid('red', 'blue', 'yellow').required(),
      nickname: Joi.string().min(2).max(50).optional()
    })
    .required()
};

const signin = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string()
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/
        )
        .required()
    })
    .required()
};

export default { signup, signin };
