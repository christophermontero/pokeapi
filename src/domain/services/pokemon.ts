import { Request, Response } from 'express';
import httpResponses from '../../constants/responses';
import logger from '../../utils/logger';
import { PokemonORM } from '../orm/pokemon';
import { IPokemonGeneralInfo } from '../models/getPokemons';

export const PokemonService = {
  GetPokemons: async (req: Request, res: Response) => {
    try {
      const pokemons = await PokemonORM.FindAll(
        Number(req.query.limit) || 10,
        Number(req.query.offset) || 0
      );

      const pokemonsGeneralInfo: IPokemonGeneralInfo[] = [];
      for (const pokemon of pokemons.results) {
        const pokemonDetails = await PokemonORM.FindByName(pokemon);

        pokemonsGeneralInfo.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          url: pokemonDetails.url,
          sprite: pokemonDetails.sprites.front_default,
          types: pokemonDetails.types.map((type: any) => type.type.name)
        });
      }

      return res.status(httpResponses.OK.httpCode).json({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message,
        data: pokemonsGeneralInfo
      });
    } catch (error: any) {
      logger.Danger(`${error.message}`);

      return res.status(httpResponses.INTERNAL_ERROR.httpCode).json({
        code: httpResponses.INTERNAL_ERROR.code,
        message: httpResponses.INTERNAL_ERROR.message
      });
    }
  },
  GetPokemonDetails: async (req: Request, res: Response) => {}
};
