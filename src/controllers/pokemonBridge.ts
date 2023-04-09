import { Router } from 'express';
import { PokemonService } from '../domain/services/pokemon';
import { validateParam, validateQuery, validateToken } from '../middlewares';
import {
  validateGetPokemonByName,
  validateGetPokemons
} from '../validators/pokemon';

const pokemonBridge = Router();

pokemonBridge.get(
  '/',
  [validateToken, validateQuery(validateGetPokemons)],
  PokemonService.GetPokemons
);

pokemonBridge.get(
  '/:name',
  [validateToken, validateParam(validateGetPokemonByName)],
  PokemonService.GetPokemonDetails
);

export default pokemonBridge;
