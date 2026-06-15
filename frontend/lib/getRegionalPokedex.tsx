type pkmnData = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

export const regionalPokedex = async (pokedexes: string[]) => {
  const regionalDex = await Promise.all(
    pokedexes.map(async (url) => {
      const res = await fetch(url);
      const data = await res.json();

      const pokemonEntries = data.pokemon_entries.map((pokemon: pkmnData) => {
        const entryNumber = Number(
          pokemon.pokemon_species.url.match(/\d+/g)?.pop(),
        );

        return {
          name: pokemon.pokemon_species.name,
          url: `https://pokeapi.co/api/v2/pokemon/${entryNumber}`,
        };
      });

      return [{ title: `${data.name} Pokedex` }, ...pokemonEntries];
    }),
  );

  return regionalDex.flat();
};
