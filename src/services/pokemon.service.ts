import config from '../config/config';
import logger from '../config/logger';

const findAll = async (limit: string, offset: string) => {
  try {
    const pokemons = await fetch(
      `${config.pokemon.baseUrl}/pokemon?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json());

    return pokemons;
  } catch (error: any) {
    logger.error(error.message);
    throw error;
  }
};

const findByName = async (name: any) => {
  try {
    const pokemonDetails = await fetch(
      `${config.pokemon.baseUrl}/pokemon/${name}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.status === 200 && response.json());

    return pokemonDetails;
  } catch (error: any) {
    logger.error(`${error.message}`);
    throw error;
  }
};

const findTypeByName = async (name: string) => {
  try {
    const typeDetails = await fetch(`${config.pokemon.baseUrl}/type/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json());

    return typeDetails;
  } catch (error: any) {
    logger.error(`${error.message}`);
    throw error;
  }
};

const findPokemonSpeciesById = async (id: string) => {
  try {
    const pokemonSpeciesDetails = await fetch(
      `${config.pokemon.baseUrl}/pokemon-species/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json());

    return pokemonSpeciesDetails;
  } catch (error: any) {
    logger.error(`${error.message}`);
    throw error;
  }
};

const findPokemonEvolChainById = async (id: string) => {
  try {
    const pokemonEvolutionChainDetails = await fetch(
      `${config.pokemon.baseUrl}/evolution-chain/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json());

    return pokemonEvolutionChainDetails;
  } catch (error: any) {
    logger.error(`${error.message}`);
    throw error;
  }
};

export default {
  findAll,
  findByName,
  findTypeByName,
  findPokemonSpeciesById,
  findPokemonEvolChainById
};
