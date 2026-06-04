"use client";
import { useParams } from "next/navigation";
import { getPokemon } from "@/lib/getPokemon";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const slug = useParams().dexNumber;
  if (typeof slug !== "string") return <div>ERROR</div>;

  const { isLoading, error, data } = useQuery({
    queryKey: ["pokemon", slug],
    queryFn: () => getPokemon(slug),
    staleTime: Infinity,
  });

  if (error) return <div>ERROR</div>;

  if (isLoading) return <div>LOADING</div>;

  return (
    <div>
      <div>{data.name}</div>
    </div>
  );
};

export default Page;
