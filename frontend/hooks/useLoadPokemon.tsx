import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "@/lib/getPokemon";

type pokemonEntries = {
  name: string;
  url: string;
};

export default function useLoadPokemon(
  dexKey: string,
  entries: pokemonEntries[],
) {
  const [page, setPage] = useState(0);
  const { data: pokemons, isLoading } = useQuery({
    queryKey: ["pokemon-page", dexKey, page],
    queryFn: () => getPokemon(page, entries, BATCH),
    staleTime: Infinity,
  });
  const BATCH = 49;
  const totalPages = Math.ceil(entries.length / BATCH);

  const paginate = (num: number) => {
    setPage(num - 1);
  };

  return {
    pokemons,
    isLoading,
    page,
    totalPages,
    paginate,
    BATCH,
  };
}
