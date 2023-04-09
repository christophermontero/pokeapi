import logger from '../../utils/logger';
import config from 'config';

const pokemonBaseUrl = config.get('pokemonBaseUrl');

export const PokemonORM = {
  FindAll: async (limit: number, offset: number) => {
    try {
      const pokemons = await fetch(
        `${pokemonBaseUrl}/pokemon?limit=${limit}&offset=${offset}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const pokemonsGeneralData = await pokemons.json();

      return pokemonsGeneralData;
    } catch (error: any) {
      logger.Danger(`${error.message}`);
      throw error;
    }
  },
  FindByName: async (name: string) => {}
};
