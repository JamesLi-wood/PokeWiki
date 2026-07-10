import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "@/lib/getPokemon";
import { PokemonData } from "@/types/pokemonData";

export default function useGetPokemon(name: string) {
  const {
    data: pokemon,
    isLoading,
    error,
    isError,
  } = useQuery<PokemonData>({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
    staleTime: Infinity,
    retry: false,
  });

  return { pokemon, error, isError, isLoading };
}
