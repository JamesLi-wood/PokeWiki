type entryData = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

export const nationalPokedex = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  const data = await res.json();
  const entries = data.pokemon_entries.map((pokemon: entryData) => ({
    name: pokemon.pokemon_species.name,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemon.entry_number}`,
  }));
  return { title: "National Pokedex", entries: entries };
};
