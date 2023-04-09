import config from 'config';
import logger from '../../utils/logger';

const pokemonBaseUrl = config.get('pokemonBaseUrl');

export const PokemonORM = {
  FindAll: async (limit: string, offset: string) => {
    logger.Info(`PokemonORM.FindAll(limit: ${limit}, offset: ${offset})`);
    try {
      const pokemons = await fetch(
        `${pokemonBaseUrl}/pokemon?limit=${limit}&offset=${offset}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((response) => response.json());

      return pokemons;
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  },
  FindByName: async (name: any) => {
    logger.Info(`PokemonORM.FindByName(name: ${name})`);
    try {
      const pokemonDetails = await fetch(`${pokemonBaseUrl}/pokemon/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.status === 200 && response.json());

      return pokemonDetails;
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  },
  FindTypeByName: async (name: string) => {
    logger.Info(`PokemonORM.FindTypeByName(name: ${name})`);
    try {
      const typeDetails = await fetch(`${pokemonBaseUrl}/type/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json());

      return typeDetails;
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  },
  FindPokemonSpeciesById: async (id: string) => {
    logger.Info(`PokemonORM.FindPokemonSpeciesById(id: ${id})`);
    try {
      const pokemonSpeciesDetails = await fetch(
        `${pokemonBaseUrl}/pokemon-species/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((response) => response.json());

      return pokemonSpeciesDetails;
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  },
  FindPokemonEvolChainById: async (id: string) => {
    logger.Info(`PokemonORM.FindPokemonEvolChainById(id: ${id})`);
    try {
      const pokemonEvolutionChainDetails = await fetch(
        `${pokemonBaseUrl}/evolution-chain/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then((response) => response.json());

      return pokemonEvolutionChainDetails;
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  }
};
