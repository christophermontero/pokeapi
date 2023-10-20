import { Router } from 'express';
import pokemonController from '../../controllers/pokemon.controller';
import validateToken from '../../middlewares/token';
import validate from '../../middlewares/validate';
import pokemonValidation from '../../validators/pokemon.validator';

const pokemon = Router();

pokemon.get(
  '/',
  [validateToken(), validate(pokemonValidation.getPokemons)],
  pokemonController.getPokemons
);
pokemon.get(
  '/:name',
  [validateToken(), validate(pokemonValidation.getPokemonByName)],
  pokemonController.getPokemonsDetails
);

export default pokemon;
