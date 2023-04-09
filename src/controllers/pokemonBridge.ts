import { Router } from 'express';
import { PokemonService } from '../domain/services/pokemon';
import { validateParam, validateQuery } from '../middlewares';
import { validateGetPokemonByName, validateGetPokemons } from '../validators/pokemon';

const pokemonBridge = Router();

pokemonBridge.get(
  '/',
  [validateQuery(validateGetPokemons)],
  PokemonService.GetPokemons
);

pokemonBridge.get(
  '/:name',
  [validateParam(validateGetPokemonByName)],
  PokemonService.GetPokemonDetails
);

export default pokemonBridge;
