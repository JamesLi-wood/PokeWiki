"use client";
import { useParams } from "next/navigation";
import { Badge, Card, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useGetPokemon from "@/hooks/useGetPokemon";
import ErrorPage from "@/components/errorPage";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { Chain } from "@/types/evolutionChain";

const Page = () => {
  const slug = useParams().name;

  if (typeof slug !== "string")
    return <ErrorPage title={"MissingNo has appeared."} />;

  const {
    pokemonSpecies,
    pokemonData,
    evolutionChain,
    isLoading,
    error,
    isError,
  } = useGetPokemon(slug);
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isError && error) return <ErrorPage title={error.message} />;
  if (isLoading) return <div>LOADING</div>;

  console.log(pokemonSpecies);
  console.log(pokemonData);
  console.log(evolutionChain);

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
          {pokemonSpecies?.is_legendary && (
            <Badge color="orange" size={`${isMobile ? "sm" : "lg"}`}>
              Legendary
            </Badge>
          )}
          {pokemonSpecies?.is_mythical && (
            <Badge color="red" size={`${isMobile ? "sm" : "lg"}`}>
              Mythical
            </Badge>
          )}
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

  const EvolutionChain = ({ chain }: { chain: Chain }) => {
    // For pokemons that don't evolve
    if (chain.evolves_to.length == 0 && chain.evolution_details.length == 0)
      return;

    const upToDateEvolution = chain.evolution_details.filter((key) => {
      return key.is_default == true;
    })[0];
    const id = chain.species.url.split("/").filter(Boolean).pop();

    return (
      <>
        <div className="flex gap-2 items-center">
          {upToDateEvolution && <div className="w-2 h-2 bg-green-500"></div>}
          <Card bg="var(--secondary)" w={`${isMobile ? "6rem" : "10rem"}`}>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
              alt={`${chain.species.name}`}
              h={`${isMobile ? "4rem" : "7rem"}`}
              fit="contain"
            />
          </Card>

          {chain.evolves_to.length == 1 && (
            <>
              {chain.evolves_to.map((child) => (
                <EvolutionChain key={child.species.name} chain={child} />
              ))}
            </>
          )}
        </div>

        {chain.evolves_to.length >= 2 && (
          <div className="flex flex-col gap-4">
            {chain.evolves_to.map((child) => (
              <EvolutionChain key={child.species.name} chain={child} />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`${isMobile ? "text-xs mx-auto w-[85%]" : "text-xl"}`}>
      <DisplayPokemon />
      <DisplayAbility />

      {evolutionChain && (
        <div className="flex justify-center gap-2">
          <EvolutionChain chain={evolutionChain.chain} />
        </div>
      )}
    </div>
  );
};

export default Page;
