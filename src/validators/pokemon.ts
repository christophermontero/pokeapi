import Joi from 'joi';
import { IGetPokemons } from '../domain/models/getPokemons';

const validateGetPokemons = (getPokemons: IGetPokemons) => {
  const getPokemonsSchema = Joi.object({
    limit: Joi.number().integer().multiple(10).min(10).max(100).default(10),
    offset: Joi.number().integer().min(0).default(0)
  }).required();

  return getPokemonsSchema.validate(getPokemons);
};

export default validateGetPokemons;
