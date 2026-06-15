import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "@/lib/getPokemon";

type dex =
  | {
      name: string;
      url: string;
    }
  | {
      title: string;
    };

export default function useLoadPokemon(ver: string, dex: dex[]) {
  const [page, setPage] = useState(0);
  const { data: pokemons, isLoading } = useQuery({
    queryKey: ["pokemon-page", ver, page],
    queryFn: () => getPokemon(page, dex),
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
