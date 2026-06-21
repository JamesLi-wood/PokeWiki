type entries = {
  name: string;
  url: string;
};

/* 
  entries.name will not be used due to some species
  having different forms ex: rotom-wash
*/
export const getPokemon = async (
  page: number,
  entries: entries[],
  batch: number,
) => {
  const head = page * batch;
  let tail = head + batch;

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
