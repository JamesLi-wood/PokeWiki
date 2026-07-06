import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "@/lib/getPokemon";

export default function useGetPokemon(name: string) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
    staleTime: Infinity,
    retry: false,
  });

  return { data, error, isError, isLoading };
}
