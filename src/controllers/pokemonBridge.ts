import { Router } from 'express';
import { PokemonService } from '../domain/services/pokemon';
import { validateBody, validateQuery } from '../middlewares';
import validateGetPokemons from '../validators/pokemon';

const pokemonBridge = Router();

pokemonBridge.get(
  '/',
  [validateQuery(validateGetPokemons)],
  PokemonService.GetPokemons
);

pokemonBridge.get('/:name', PokemonService.GetPokemonDetails);

export default pokemonBridge;
