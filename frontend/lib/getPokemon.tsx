import { PokemonData } from "@/types/pokemonData";
import { PokemonSpecies } from "@/types/pokemonSpecies";

type PokemonResponse = {
  pokemonSpecies: PokemonSpecies;
  pokemonData: PokemonData;
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

  return { pokemonSpecies, pokemonData };
};
