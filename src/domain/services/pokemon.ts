import { Request, Response } from 'express';
import httpResponses from '../../constants/responses';
import logger from '../../utils/logger';
import { PokemonORM } from '../orm/pokemon';

export const PokemonService = {
  GetPokemons: async (req: Request, res: Response) => {
    try {
      const pokemons = await PokemonORM.FindAll(
        Number(req.query.limit) || 10,
        Number(req.query.offset) || 0
      );

      return res.status(httpResponses.OK.httpCode).json({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message,
        data: pokemons
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
