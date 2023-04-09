export interface IGetPokemons {
  limit: number;
  offset: number;
}

export interface IPokemonGeneralInfo {
  id: number;
  name: string;
  url: string;
  sprite: string;
  types: string[];
}
