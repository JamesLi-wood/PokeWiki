import { db } from "./db";

export async function getPokemon(entryNumber: string) {
  const cached = await db.pokemon.get(entryNumber);

  if (cached) return cached.data;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${entryNumber}/`);
  const data = await res.json();
  await db.pokemon.put({ entryNumber, data });

  return data;
}
