import { db } from "./db";

type pkmnData = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

export async function getRegionalPokedex(name: string, pokedexes: string[]) {
  const cached = await db.regionalPokedex.get(name);

  if (cached) return cached.regionalDex;

  const regionalDex = await Promise.all(
    pokedexes.map(async (url) => {
      const res = await fetch(url);
      const data = await res.json();

      const entryNumbers = data.pokemon_entries.map((pokemon: pkmnData) => {
        return Number(pokemon.pokemon_species.url.match(/\d+/g)?.pop());
      });

      return {
        title: data.name,
        entryNumbers: entryNumbers,
      };
    }),
  );

  await db.regionalPokedex.put({ name, regionalDex });
  return regionalDex;
}
