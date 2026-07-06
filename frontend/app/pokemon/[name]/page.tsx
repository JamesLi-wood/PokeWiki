"use client";
import { useParams } from "next/navigation";
import ErrorPage from "@/components/errorPage";
import useGetPokemon from "@/hooks/useGetPokemon";

const Page = () => {
  const slug = useParams().name;

  if (typeof slug !== "string")
    return <ErrorPage title={"MissingNo has appeared."} />;

  const { data, isLoading, error, isError } = useGetPokemon(slug);

  if (isError && error) return <ErrorPage title={error.message} />;

  if (isLoading) return <div>LOADING</div>;
  
  return (
    <div>
      <div>{data.name}</div>
    </div>
  );
};

export default Page;
