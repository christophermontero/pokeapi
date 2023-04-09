import { Request, Response } from 'express';
import httpResponses from '../../constants/responses';
import logger from '../../utils/logger';
import { IPokemonGeneralInfo } from '../models/getPokemons';
import { PokemonORM } from '../orm/pokemon';

export const PokemonService = {
  GetPokemons: async (req: Request, res: Response) => {
    try {
      const pokemons = await PokemonORM.FindAll(
        Number(req.query.limit) || 10,
        Number(req.query.offset) || 0
      );

      const pokemonsGeneralInfo: IPokemonGeneralInfo[] = await Promise.all(
        pokemons.results.map((pokemon: any) => PokemonORM.FindByName(pokemon))
      );

      const processedPokemonsGeneralInfo: IPokemonGeneralInfo[] =
        pokemonsGeneralInfo.map((pokemon: any) => ({
          id: pokemon.id,
          name: pokemon.name,
          url: pokemon.url,
          sprite: pokemon.sprites.front_default,
          types: pokemon.types.map((type: any) => type.type.name)
        }));

      return res.status(httpResponses.OK.httpCode).json({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message,
        data: processedPokemonsGeneralInfo
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
