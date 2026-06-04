import { db } from "./db";

type pkmnData = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

export async function getNationalPokedex(limit: number) {
  const cached = await db.nationalPokedex.toArray();

  if (cached.length > 0) return cached.slice(0, limit);

  const res = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  const data = await res.json();
  const nationalDex = await Promise.all(
    data.pokemon_entries.map(async (pokemon: pkmnData) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.entry_number}`,
      );

      const extraPkmnData = await response.json();

      return {
        name: pokemon.pokemon_species.name,
        entryNumber: pokemon.entry_number,
        currentTypes: extraPkmnData.types,
        pastTypes:
          extraPkmnData.past_types.length > 0
            ? extraPkmnData.past_types[0].types
            : [],
      };
    }),
  );

  await db.nationalPokedex.bulkPut(nationalDex);

  return nationalDex.slice(0, limit);
}
