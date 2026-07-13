"use client";
import { useParams } from "next/navigation";
import { Badge, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useGetPokemon from "@/hooks/useGetPokemon";
import ErrorPage from "@/components/errorPage";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

const Page = () => {
  const slug = useParams().name;

  if (typeof slug !== "string")
    return <ErrorPage title={"MissingNo has appeared."} />;

  const { pokemonSpecies, pokemonData, isLoading, error, isError } =
    useGetPokemon(slug);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isError && error) return <ErrorPage title={error.message} />;
  if (isLoading) return <div>LOADING</div>;

  const DisplayAbility = () => {
    if (!pokemonData) return;

    const regularAbilities = pokemonData.abilities.filter(
      (ability) => ability.is_hidden == false,
    );
    const hiddenAbilities = pokemonData.abilities.filter(
      (ability) => ability.is_hidden == true,
    );

    return (
      <div className="flex mt-4">
        <div className="gap-2 flex flex-1 flex-col items-center">
          <div>Abilities</div>
          <div className="flex flex-wrap justify-center gap-2">
            {regularAbilities.map((pokemonData) => (
              <Badge
                key={pokemonData.ability.name}
                size={`${isMobile ? "sm" : "lg"}`}
              >
                {pokemonData.ability.name}
              </Badge>
            ))}
          </div>
        </div>

        {(hiddenAbilities.length ?? 0) > 0 && (
          <div className="gap-2 flex flex-1 flex-col items-center">
            <div>Hidden Ability</div>
            <div className="flex flex-wrap justify-center gap-2">
              {hiddenAbilities?.map((pokemonData) => (
                <Badge
                  key={pokemonData.ability.name}
                  color="grape"
                  size={`${isMobile ? "sm" : "lg"}`}
                >
                  {pokemonData.ability.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const DisplayPokemon = () => {
    if (!pokemonData) return;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-4">
          <div>{`#${pokemonData.id}`}</div>
          <div>{capitalizeFirstLetter(pokemonData.species.name)}</div>
        </div>

        <div className="flex gap-2">
          <Image
            src={pokemonData.sprites.other.home.front_default}
            alt={pokemonData.species.name}
            w={`${isMobile ? "7rem" : "10rem"}`}
            h="auto"
            fit="contain"
          />
          <Image
            src={pokemonData.sprites.other.home.front_shiny}
            alt={pokemonData.species.name}
            w={`${isMobile ? "7rem" : "10rem"}`}
            h="auto"
            fit="contain"
          />
        </div>
      </div>
    );
  };

  const HeldItem = () => {
    return <div>Held Item</div>;
  };

  return (
    <div className={`${isMobile ? "text-xs mx-auto w-[85%]" : "text-xl"}`}>
      <DisplayPokemon />
      <DisplayAbility />
      <HeldItem />
    </div>
  );
};

export default Page;
