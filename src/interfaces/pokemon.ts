export interface IPokemonGeneralInfo {
  id: number;
  name: string;
  url: string;
  sprite: string;
  types: string[];
}

export interface IPokemonDetails {
  id: number;
  name: string;
  sprite: string;
  experience: number;
  abilities: string[];
  height: number;
  weight: number;
  types: string[];
  strengths: string[];
  weaknesses: string[];
  stats: {
    name: string;
    value: number;
  }[];
  evolution: {
    id: string;
    name: string;
    evolves_to: {
      id: string;
      name: string;
      evolves_to: any[];
    }[];
  };
}
