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
    queryFn: () => getPokemon(page, entries),
    staleTime: Infinity,
  });

  const paginateUp = () => {
    setPage((prev) => prev + 1);
  };

  const paginateDown = () => {
    if (page == 0) return;
    setPage((prev) => prev - 1);
  };

  return { pokemons, isLoading, paginateUp, paginateDown };
}
