type entries = {
  name: string;
  url: string;
};

export const getPokemon = async (page: number, entries: entries[]) => {
  const BATCH = 50;
  const head = page * BATCH;
  let tail = head + BATCH;

  const nthPage = Promise.all(
    entries.slice(head, tail).map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();

      return {
        name: data.species.name,
        entryNumber: data.id,
        currentTypes: data.types,
        pastTypes: data.past_types.length > 0 ? data.past_types[0].types : [],
      };
    }),
  );

  return nthPage;
};
