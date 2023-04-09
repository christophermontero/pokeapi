export const buildEvolutionChain = (chain: any) => {
  const { species, evolves_to } = chain;

  const evolutionDetails = {
    id: species.url.split('/').slice(-2).shift(),
    name: species.name,
    evolves_to: evolves_to.length > 0 ? evolves_to.map(buildEvolutionChain) : []
  };

  return evolutionDetails;
};

export const buildPokemonDetails = (
  pokemon: any,
  pokemonTypes: any,
  evolChain: any
) => {
  const abilities = pokemon.abilities.map(
      (ability: any) => ability.ability.name
    ),
    types = pokemonTypes.map((type: any) => type.name),
    stats = pokemon.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat
    })),
    strengths = pokemonTypes.flatMap((type: any) =>
      type.damage_relations.double_damage_to.map(
        (strength: any) => strength.name
      )
    ),
    weaknesses = pokemonTypes.flatMap((type: any) =>
      type.damage_relations.double_damage_from.map(
        (weakness: any) => weakness.name
      )
    ),
    evolution = buildEvolutionChain(evolChain.chain);

  return {
    abilities,
    types,
    stats,
    strengths,
    weaknesses,
    evolution
  };
};
