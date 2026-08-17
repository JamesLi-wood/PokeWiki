"use client";
import { useParams, useRouter } from "next/navigation";
import { Badge, Card, Image, NumberFormatter, Progress } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useGetPokemon from "@/hooks/useGetPokemon";
import MoveSet from "@/components/moveSet";
import LoadPkmnType from "@/components/loadPkmnType";
import ErrorPage from "@/components/errorPage";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import minMaxStat from "@/utils/minMaxStat";
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
  const router = useRouter();
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

        <div className="flex gap-2">
          {pokemonData.types.map((data) => (
            <LoadPkmnType
              key={data.slot}
              type={data.type.name}
              isMobile={isMobile}
            />
          ))}
        </div>

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

    if (chain.species.name == "eevee")
      return <div>{/* Special one for eevee where it wraps around */}</div>;

    const upToDateEvolution = chain.evolution_details.filter((key) => {
      return key.is_default == true;
    })[0];
    const id = chain.species.url.split("/").filter(Boolean).pop();

    return (
      <>
        <div className="flex gap-2 items-center">
          {upToDateEvolution && <div className="w-2 h-2 bg-green-500"></div>}
          <Card
            className="cursor-pointer"
            bg="var(--secondary)"
            w={`${isMobile ? "6rem" : "10rem"}`}
            onClick={() => {
              router.push(`/pokemon/${chain.species.name}`);
            }}
          >
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
        <div className="flex flex-col">
          <div className="title p-2">{title}</div>
          <div className="bg-(--secondary) flex flex-col flex-1 items-center justify-center p-2">
            {children}
          </div>
        </div>
      );
    };

    return (
      <div
        className={`${!isMobile && "text-base"} [&_.title]:bg-blue-500 text-center grid grid-cols-3 gap-4`}
      >
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
    if (!pokemonData) return;

    const total = pokemonData.stats.reduce(
      (total, current) => total + current.base_stat,
      0,
    );

    const getColor = (num: number) => {
      if (num <= 60) return "red";
      if (num <= 80) return "orange";
      if (num <= 100) return "green";
      if (num <= 120) return "lime";
      if (num <= 149) return "teal";
      return "cyan";
    };

    return (
      <div className="flex flex-col gap-2 bg-(--secondary) p-4 rounded-2xl">
        {pokemonData.stats.map((stat) => {
          const { minHP, maxHP, minStat, maxStat } = minMaxStat(
            stat.base_stat,
            100,
          );

          return (
            <div
              key={stat.stat.name}
              className="grid grid-cols-[auto_1fr_auto] gap-4 items-center"
            >
              <div
                className={`${isMobile ? "w-32" : "w-48"} flex justify-between`}
              >
                <div>{capitalizeFirstLetter(stat.stat.name)}</div>
                <div>{stat.base_stat}</div>
              </div>
              <Progress
                w="100%"
                value={(stat.base_stat / 255) * 100}
                size="lg"
                color={getColor(stat.base_stat)}
                transitionDuration={200}
              />
              <div
                className={`${isMobile ? "w-15" : "w-22"} flex justify-between`}
              >
                <div>{stat.stat.name == "hp" ? minHP : minStat}</div>
                <div>{stat.stat.name == "hp" ? maxHP : maxStat}</div>
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
          <div className={`${isMobile ? "w-32" : "w-48"} flex justify-between`}>
            <div>Total</div>
            <div>{total}</div>
          </div>
          <div></div>
          <div className={`${isMobile ? "w-15" : "w-22"} flex justify-between`}>
            <div>Min</div>
            <div>Max</div>
          </div>
        </div>
      </div>
    );
  };

  const Moves = () => {
    if (!pokemonData) return;

    const tm = pokemonData.moves.filter((moveData) =>
      moveData.version_group_details.some(
        (detail) => detail.move_learn_method.name === "machine",
      ),
    );

    const levelUp = pokemonData.moves
      .filter((moveData) =>
        moveData.version_group_details.some(
          (detail) => detail.move_learn_method.name === "level-up",
        ),
      )
      .sort((a, b) => {
        const levelA = a.version_group_details.find(
          (detail) => detail.move_learn_method.name === "level-up",
        )!.level_learned_at;

        const levelB = b.version_group_details.find(
          (detail) => detail.move_learn_method.name === "level-up",
        )!.level_learned_at;

        return levelA - levelB;
      });

    return (
      <div className="flex flex-wrap justify-center gap-4">
        <div className="min-w-1/2 max-w-full">
          <div className="text-center mb-4 font-bold text-lg">LEARNED MOVES</div>
          <div className="flex flex-wrap w-full justify-center gap-4">
            {levelUp.map((move) => (
              <MoveSet
                key={move.move.name}
                moveSet={move}
                condition="level-up"
              />
            ))}
          </div>
        </div>

        <div className="min-w-1/2 max-w-full">
          <div className="text-center mb-4 font-bold text-lg">TM MOVES</div>
          <div className="flex flex-wrap w-full justify-center gap-4">
            {tm.map((move) => (
              <MoveSet key={move.move.name} moveSet={move} condition="tm" />
            ))}
          </div>
        </div>
      </div>
    );
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
      <Stats />
      <Moves />
    </div>
  );
};

export default Page;
