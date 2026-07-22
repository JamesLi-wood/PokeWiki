"use client";
import { useParams } from "next/navigation";
import { Badge, Card, Image, NumberFormatter } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useGetPokemon from "@/hooks/useGetPokemon";
import LoadPkmnType from "@/components/loadPkmnType";
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

  const DisplayAbility = () => {
    if (!pokemonData) return;

    const regularAbilities = pokemonData.abilities.filter(
      (ability) => ability.is_hidden == false,
    );
    const hiddenAbilities = pokemonData.abilities.filter(
      (ability) => ability.is_hidden == true,
    );

    return (
      <div className={`${isMobile ? "flex-row" : "flex-col gap-5"} flex`}>
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
    if (!pokemonData || !pokemonSpecies) return;

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 ">
          <div>{`#${pokemonData.id}`}</div>
          <div>{capitalizeFirstLetter(pokemonData.species.name)}</div>
          {pokemonSpecies.is_legendary && (
            <Badge color="orange" size={`${isMobile ? "sm" : "lg"}`}>
              Legendary
            </Badge>
          )}
          {pokemonSpecies.is_mythical && (
            <Badge color="red" size={`${isMobile ? "sm" : "lg"}`}>
              Mythical
            </Badge>
          )}
        </div>

        <LoadPkmnType types={pokemonData.types} isMobile={isMobile} />

        <div className="flex gap-8">
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

  const SpecialInfo = () => {
    if (!pokemonSpecies || !pokemonData) return;

    const expGrowthMax = {
      "slow-then-very-fast": 600000,
      fast: 800000,
      medium: 1000000,
      "medium-slow": 1059860,
      slow: 1250000,
      "fast-then-very-slow": 1640000,
    };

    const totalInches = Math.round((pokemonData.height / 10) * 39.3701);
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    const pounds = (pokemonData.weight / 10) * 2.20462;

    const InfoTable = ({
      children,
      title,
    }: {
      children: React.ReactNode;
      title: string;
    }) => {
      return (
        <div className="border flex flex-col">
          <div className="title border-b p-2">{title}</div>
          <div className="flex flex-col flex-1 items-center justify-center p-1">
            {children}
          </div>
        </div>
      );
    };

    return (
      <div className="[&_.title]:bg-blue-500 text-center grid grid-cols-3 gap-2">
        <InfoTable title="Base Happiness">
          {pokemonSpecies.base_happiness}
        </InfoTable>
        <InfoTable title="Capture Rate">
          {pokemonSpecies.capture_rate}
        </InfoTable>
        <InfoTable title="Egg Groups">
          {pokemonSpecies.egg_groups.map((group) => (
            <div key={group.name}>{group.name}</div>
          ))}
        </InfoTable>
        <InfoTable title="Experience Growth">
          <div>{pokemonSpecies.growth_rate.name}</div>
          <div>
            <NumberFormatter
              thousandSeparator
              value={
                expGrowthMax[
                  pokemonSpecies.growth_rate.name as keyof typeof expGrowthMax
                ]
              }
            />
          </div>
        </InfoTable>
        <InfoTable title="Gender Rate">
          {pokemonSpecies.gender_rate == -1 ? (
            <>Genderless</>
          ) : (
            <>
              <div>{`Male: ${100 - pokemonSpecies.gender_rate * 12.5}%`}</div>
              <div>{`Female: ${pokemonSpecies.gender_rate * 12.5}%`}</div>
            </>
          )}
        </InfoTable>
        <InfoTable title="Base Egg Steps">
          <div>
            <NumberFormatter
              thousandSeparator
              value={pokemonSpecies.hatch_counter * 128}
            />{" "}
            Steps
          </div>
          <div>{`${pokemonSpecies.hatch_counter} Cycles`}</div>
        </InfoTable>
        <InfoTable title="Height">{`${feet}' ${inches}"`}</InfoTable>
        <InfoTable title="Weight">{`${pounds.toFixed(1)} lbs`}</InfoTable>
      </div>
    );
  };

  const Stats = () => {
    return <div></div>;
  };

  const Moves = () => {
    return <div></div>;
  };

  return (
    <div
      className={`${isMobile ? "text-xs mx-auto w-[90%]" : "text-xl px-7"} flex flex-col gap-8`}
    >
      <DisplayPokemon />
      <div
        className={`${isMobile ? "flex-col" : "flex-row items-center justify-center"} flex gap-4`}
      >
        <DisplayAbility />
        {evolutionChain && (
          <div className="flex justify-center gap-2">
            <EvolutionChain chain={evolutionChain.chain} />
          </div>
        )}
      </div>
      <SpecialInfo />
    </div>
  );
};

export default Page;
