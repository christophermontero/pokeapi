import Joi from 'joi';

const getPokemons = {
  query: Joi.object()
    .keys({
      limit: Joi.number().integer().min(0).max(100).default(10),
      offset: Joi.number().integer().min(0).default(0)
    })
    .optional()
};

const getPokemonByName = {
  params: Joi.object()
    .keys({
      name: Joi.string()
        .regex(/^[a-z-]+$/)
        .min(2)
        .max(50)
        .required()
    })
    .required()
};

export default { getPokemons, getPokemonByName };
