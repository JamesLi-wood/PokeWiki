import { useQuery } from "@tanstack/react-query";
import { getMove } from "@/lib/getMove";

export default function useGetMove(move: string, url: string) {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["move", move],
    queryFn: () => getMove(url),
    staleTime: Infinity,
    retry: false,
  });

  return { move: data?.moveData, isLoading, error, isError };
}
