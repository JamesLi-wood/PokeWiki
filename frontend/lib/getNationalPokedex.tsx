export const nationalPokedex = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
  const data = await res.json();
  return [{ title: "National Pokedex" }, ...data.results];
};
