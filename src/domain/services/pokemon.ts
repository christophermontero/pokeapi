import { Request, Response } from 'express';
import httpResponses from '../../constants/responses';
import logger from '../../utils/logger';
import { buildPokemonDetails } from '../../utils/pokemon';
import { IPokemonDetails, IPokemonGeneralInfo } from '../models/pokemon';
import { PokemonORM } from '../orm/pokemon';
import { TrainerORM } from '../orm/trainer';

export const PokemonService = {
  GetPokemons: async (req: Request, res: Response) => {
    try {
      const trainer = await TrainerORM.FindByName(req.body.user.name);

      if (!trainer) {
        return res.status(httpResponses.TRAINER_NOT_EXISTS.httpCode).json({
          code: httpResponses.TRAINER_NOT_EXISTS.code,
          message: httpResponses.TRAINER_NOT_EXISTS.message
        });
      }

      const pokemons = await PokemonORM.FindAll(
        req.query.limit?.toString() || '10',
        req.query.offset?.toString() || '0'
      );

      const pokemonsGeneralInfo: IPokemonGeneralInfo[] = await Promise.all(
        pokemons.results.map((pokemon: any) =>
          PokemonORM.FindByName(pokemon.name)
        )
      );

      const processedPokemonsGeneralInfo: IPokemonGeneralInfo[] =
        pokemonsGeneralInfo.map((pokemon: any) => ({
          id: pokemon.id,
          name: pokemon.name,
          url: pokemon.url,
          sprite: pokemon.sprites.other['official-artwork'].front_default,
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
  GetPokemonDetails: async (req: Request, res: Response) => {
    try {
      const trainer = await TrainerORM.FindByName(req.body.user.name);

      if (!trainer) {
        return res.status(httpResponses.TRAINER_NOT_EXISTS.httpCode).json({
          code: httpResponses.TRAINER_NOT_EXISTS.code,
          message: httpResponses.TRAINER_NOT_EXISTS.message
        });
      }

      const pokemon = await PokemonORM.FindByName(req.params.name);

      if (!pokemon) {
        return res.status(httpResponses.POKEMON_NOT_EXISTS.httpCode).json({
          code: httpResponses.POKEMON_NOT_EXISTS.code,
          message: httpResponses.POKEMON_NOT_EXISTS.message
        });
      }

      const pokemonTypes = await Promise.all(
          pokemon.types.map((type: any) =>
            PokemonORM.FindTypeByName(type.type.name)
          )
        ),
        pokemonSpecies = await PokemonORM.FindPokemonSpeciesById(pokemon.id),
        evolChain = await PokemonORM.FindPokemonEvolChainById(
          pokemonSpecies.evolution_chain.url.split('/').slice(-2).shift()
        );

      const { abilities, evolution, stats, strengths, types, weaknesses } =
        buildPokemonDetails(pokemon, pokemonTypes, evolChain);

      const pokemonDetails: IPokemonDetails = {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.other['official-artwork'].front_default,
        experience: pokemon.base_experience,
        abilities,
        height: Number(pokemon.height),
        weight: Number(pokemon.weight),
        types,
        strengths,
        weaknesses,
        stats,
        evolution
      };

      return res.status(httpResponses.OK.httpCode).json({
        code: httpResponses.OK.code,
        message: httpResponses.OK.message,
        data: pokemonDetails
      });
    } catch (error: any) {
      logger.Danger(`${error.message}`);

      return res.status(httpResponses.INTERNAL_ERROR.httpCode).json({
        code: httpResponses.INTERNAL_ERROR.code,
        message: httpResponses.INTERNAL_ERROR.message
      });
    }
  }
};
