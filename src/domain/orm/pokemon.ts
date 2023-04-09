import config from 'config';
import logger from '../../utils/logger';

const pokemonBaseUrl = config.get('pokemonBaseUrl');

export const PokemonORM = {
  FindAll: async (limit: number, offset: number) => {
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
  FindByName: async (pokemon: any) => {
    try {
      const pokemonDetails = await fetch(pokemon.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json());

      return pokemonDetails;
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  }
};
