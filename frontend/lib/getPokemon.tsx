type dex =
  | {
      name: string;
      url: string;
    }
  | {
      title: string;
    };

export const getPokemon = async (page: number, dex: dex[]) => {
  const BATCH = 50;
  const head = page * BATCH;
  let tail = head + BATCH;

  const nthPage = Promise.all(
    dex.slice(head, tail).map(async (pokemon) => {
      if ("title" in pokemon) return pokemon.title;

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
