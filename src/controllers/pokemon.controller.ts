import { Request, Response } from 'express';
import httpStatus from 'http-status';
import httpResponses from '../constants/responses';
import { IPokemonDetails, IPokemonGeneralInfo } from '../interfaces/pokemon';
import pokemonService from '../services/pokemon.service';
import trainerService from '../services/trainer.service';
import { buildPokemonDetails } from '../utils/pokemon';

const getPokemons = async (req: Request, res: Response) => {
  try {
    const trainer = await trainerService.findByEmail(req.body.user.email);

    if (!trainer) {
      return res.status(httpStatus.NOT_FOUND).json({
        code: httpResponses.TRAINER_NOT_EXISTS.code,
        message: httpResponses.TRAINER_NOT_EXISTS.message
      });
    }

    const pokemons = await pokemonService.findAll(
      req.query.limit?.toString() || '10',
      req.query.offset?.toString() || '0'
    );

    const pokemonsGeneralInfo: IPokemonGeneralInfo[] = await Promise.all(
      pokemons.results.map((pokemon: any) =>
        pokemonService.findByName(pokemon.name)
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

    return res.status(httpStatus.OK).json({
      code: httpResponses.OK.code,
      message: httpResponses.OK.message,
      count: pokemons.count,
      data: processedPokemonsGeneralInfo
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  }
};

const getPokemonsDetails = async (req: Request, res: Response) => {
  try {
    const trainer = await trainerService.findByEmail(req.body.user.email);

    if (!trainer) {
      return res.status(httpStatus.NOT_FOUND).json({
        code: httpResponses.TRAINER_NOT_EXISTS.code,
        message: httpResponses.TRAINER_NOT_EXISTS.message
      });
    }

    const pokemon = await pokemonService.findByName(req.params.name);

    if (!pokemon) {
      return res.status(httpStatus.NOT_FOUND).json({
        code: httpResponses.POKEMON_NOT_EXISTS.code,
        message: httpResponses.POKEMON_NOT_EXISTS.message
      });
    }

    const pokemonTypes = await Promise.all(
        pokemon.types.map((type: any) =>
          pokemonService.findTypeByName(type.type.name)
        )
      ),
      pokemonSpecies = await pokemonService.findPokemonSpeciesById(pokemon.id),
      evolChain = await pokemonService.findPokemonEvolChainById(
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

    return res.status(httpStatus.OK).json({
      code: httpResponses.OK.code,
      message: httpResponses.OK.message,
      data: pokemonDetails
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      code: httpResponses.INTERNAL_ERROR.code,
      message: httpResponses.INTERNAL_ERROR.message
    });
  }
};

export default { getPokemons, getPokemonsDetails };
