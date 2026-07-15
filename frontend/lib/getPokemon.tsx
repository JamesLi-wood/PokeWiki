import { PokemonSpecies } from "@/types/pokemonSpecies";
import { PokemonData } from "@/types/pokemonData";
import { EvolutionChain } from "@/types/evolutionChain";

type PokemonResponse = {
  pokemonSpecies: PokemonSpecies;
  pokemonData: PokemonData;
  evolutionChain: EvolutionChain;
};

export const getPokemon = async (name: string): Promise<PokemonResponse> => {
  const speciesResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`,
  );
  if (!speciesResponse.ok) throw new Error("Pokemon not found.");
  const pokemonSpecies = await speciesResponse.json();

  const dataResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonSpecies.id}`,
  );
  const pokemonData = await dataResponse.json();

  const evolutionChainResponse = await fetch(
    pokemonSpecies.evolution_chain.url,
  );
  const evolutionChain = await evolutionChainResponse.json();

  return { pokemonSpecies, pokemonData, evolutionChain };
};
