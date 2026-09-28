"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Badge,
  Card,
  Image,
  NumberFormatter,
  Progress,
  Skeleton,
  Text,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useGetPokemon from "@/hooks/useGetPokemon";
import MoveSet from "@/components/moveSet";
import LoadPkmnType from "@/components/loadPkmnType";
import ErrorPage from "@/components/errorPage";
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

  // Page Skeleton
  if (isLoading || !pokemonData || !pokemonSpecies)
    return (
      <Flex
        direction="column"
        align="center"
        gap="2rem"
        w={isMobile ? "90%" : "100%"}
        py="1.5rem"
        className={`${isMobile ? "mx-auto" : "px-7"}`}
      >
        {/* Display Pokemon */}
        <Flex direction="column" align="center" gap="1rem">
          <Skeleton
            className="skeleton-bg"
            h={isMobile ? "1rem" : "1.5rem"}
            w="10rem"
            visible={true}
          />
          <Flex direction="row" gap="0.5rem">
            {Array.from({ length: 2 }, (_, idx) => (
              <Skeleton
                key={idx}
                className="skeleton-bg"
                h={isMobile ? "1rem" : "1.5rem"}
                w="4rem"
                visible={true}
              />
            ))}
          </Flex>
          <Flex direction="row" gap="2rem">
            {Array.from({ length: 2 }, (_, idx) => (
              <Skeleton
                key={idx}
                className="skeleton-bg"
                h={isMobile ? "7rem" : "10rem"}
                w={isMobile ? "7rem" : "10rem"}
                visible={true}
              />
            ))}
          </Flex>
        </Flex>
        <Flex
          direction={isMobile ? "column" : "row"}
          justify="center"
          align="center"
          gap="1rem"
          w="100%"
        >
          {/* Display Ability */}
          <Flex
            direction={isMobile ? "row" : "column"}
            className={isMobile ? "w-full" : "gap-5"}
          >
            {Array.from({ length: 2 }, (_, idx) => (
              <Flex
                key={idx}
                direction="column"
                align="center"
                flex={1}
                gap="0.5rem"
              >
                {Array.from({ length: 2 }, (_, idx) => (
                  <Skeleton
                    key={idx}
                    className="skeleton-bg"
                    h={isMobile ? "1rem" : "1.5rem"}
                    w="9rem"
                    visible={true}
                  />
                ))}
              </Flex>
            ))}
          </Flex>
          {/* Evolution Chain */}
          <Flex direction="row" align="center" gap="0.5rem">
            {Array.from({ length: 5 }, (_, idx) =>
              idx % 2 == 0 ? (
                <Skeleton
                  key={idx}
                  className="skeleton-bg"
                  h={isMobile ? "6rem" : "10rem"}
                  w={isMobile ? "6rem" : "10rem"}
                  visible={true}
                />
              ) : (
                <Skeleton
                  key={idx}
                  className="skeleton-bg"
                  h=".5rem"
                  w=".5rem"
                  radius="0"
                  visible={true}
                />
              ),
            )}
          </Flex>
        </Flex>
        {/* Special Info */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {Array.from({ length: 9 }, (_, idx) => (
            <Skeleton
              key={idx}
              className="skeleton-bg"
              h="7rem"
              radius={0}
              visible={true}
            />
          ))}
        </div>
        {/* Stats */}
        <Skeleton className="skeleton-bg" w="100%" h="15rem" />
        {/* Moves */}
        <Flex direction="column" align="center" gap="1rem">
          <Skeleton
            className="skeleton-bg"
            w="10rem"
            h={isMobile ? "1rem" : "1.5rem"}
          />
          <Flex direction="row" justify="center" wrap="wrap" gap="1rem">
            {Array.from({ length: 12 }, (_, idx) => (
              <Skeleton
                key={idx}
                className="skeleton-bg"
                w="25rem"
                h="7rem"
                radius={0}
                visible={true}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    );

  const DisplayPokemon = () => {
    return (
      <Flex direction="column" align="center" gap="1rem">
        <Flex direction="row" align="center" gap="0.5rem">
          <Text size={isMobile ? "sm" : "xl"}>{`#${pokemonData.id}`}</Text>
          <Text className="capitalize" size={isMobile ? "sm" : "xl"}>
            {pokemonData.species.name}
          </Text>
          {pokemonSpecies.is_legendary && (
            <Badge color="orange" size={isMobile ? "sm" : "lg"}>
              Legendary
            </Badge>
          )}
          {pokemonSpecies.is_mythical && (
            <Badge color="red" size={isMobile ? "sm" : "lg"}>
              Mythical
            </Badge>
          )}
        </Flex>

        <Flex direction="row" gap="0.5rem">
          {pokemonData.types.map((data) => (
            <LoadPkmnType
              key={data.slot}
              type={data.type.name}
              isMobile={isMobile}
            />
          ))}
        </Flex>
        <Flex direction="row" gap="2rem">
          <Image
            src={pokemonData.sprites.other.home.front_default}
            alt={pokemonData.species.name}
            w={isMobile ? "7rem" : "10rem"}
            h="auto"
            fit="contain"
          />
          <Image
            src={pokemonData.sprites.other.home.front_shiny}
            alt={pokemonData.species.name}
            w={isMobile ? "7rem" : "10rem"}
            h="auto"
            fit="contain"
          />
        </Flex>
      </Flex>
    );
  };

  const DisplayAbility = () => {
    const regularAbilities = pokemonData.abilities.filter(
      (ability) => ability.is_hidden == false,
    );
    const hiddenAbilities = pokemonData.abilities.filter(
      (ability) => ability.is_hidden == true,
    );

    return (
      <Flex
        direction={isMobile ? "row" : "column"}
        gap={isMobile ? "" : "1.5rem"}
      >
        <Flex direction="column" align="center" flex={1} gap="0.5rem">
          <Text size={isMobile ? "sm" : "xl"}>Abilities</Text>
          <Flex direction="row" justify="center" wrap="wrap" gap="0.5rem">
            {regularAbilities.map((pokemonData) => (
              <Badge
                key={pokemonData.ability.name}
                size={isMobile ? "sm" : "lg"}
              >
                {pokemonData.ability.name}
              </Badge>
            ))}
          </Flex>
        </Flex>
        {hiddenAbilities.length > 0 && (
          <Flex direction="column" align="center" flex={1} gap="0.5rem">
            <Text size={isMobile ? "sm" : "xl"}>Hidden Ability</Text>
            <Flex direction="row" justify="center" wrap="wrap" gap="0.5rem">
              {hiddenAbilities.map((pokemonData) => (
                <Badge
                  key={pokemonData.ability.name}
                  color="grape"
                  size={isMobile ? "sm" : "lg"}
                >
                  {pokemonData.ability.name}
                </Badge>
              ))}
            </Flex>
          </Flex>
        )}
      </Flex>
    );
  };

  const EvolutionChain = ({ chain }: { chain: Chain }) => {
    // For pokemons that don't evolve
    if (chain.evolves_to.length == 0 && chain.evolution_details.length == 0)
      return;

    if (chain.species.name == "eevee")
      return (
        <div className="evo-chain-template gap-4">
          {chain.evolves_to.map((child, idx) => {
            const id = child.species.url.split("/").filter(Boolean).pop();
            return (
              <Card
                key={child.species.name}
                className={`area${idx} cursor-pointer`}
                bg="var(--secondary)"
                w={isMobile ? "6rem" : "10rem"}
                onClick={() => {
                  router.push(`/pokemon/${child.species.name}`);
                }}
              >
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                  alt={`${child.species.name}`}
                  h={isMobile ? "4rem" : "7rem"}
                  fit="contain"
                />
              </Card>
            );
          })}
          <Card
            className="area8 cursor-pointer border-2 border-green-500"
            bg="var(--secondary)"
            w={isMobile ? "6rem" : "10rem"}
            onClick={() => {
              router.push(`/pokemon/${chain.species.name}`);
            }}
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/133.png`}
              alt={`${chain.species.name}`}
              h={isMobile ? "4rem" : "7rem"}
              fit="contain"
            />
          </Card>
        </div>
      );

    const upToDateEvolution = chain.evolution_details.filter((key) => {
      return key.is_default == true;
    })[0];
    const id = chain.species.url.split("/").filter(Boolean).pop();

    return (
      <>
        <Flex direction="row" align="center" gap="0.5rem">
          {upToDateEvolution && <div className="w-2 h-2 bg-green-500"></div>}
          <Card
            className="cursor-pointer"
            bg="var(--secondary)"
            w={isMobile ? "6rem" : "10rem"}
            onClick={() => {
              router.push(`/pokemon/${chain.species.name}`);
            }}
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
              alt={`${chain.species.name}`}
              h={isMobile ? "4rem" : "7rem"}
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
        </Flex>

        {chain.evolves_to.length >= 2 && (
          <Flex direction="column" gap="1rem">
            {chain.evolves_to.map((child) => (
              <EvolutionChain key={child.species.name} chain={child} />
            ))}
          </Flex>
        )}
      </>
    );
  };

  const SpecialInfo = () => {
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
        <Flex direction="column">
          <Text className="title" size={isMobile ? "xs" : "md"} p="0.5rem">
            {title}
          </Text>
          <Flex
            direction="column"
            justify="center"
            align="center"
            flex={1}
            bg="var(--secondary)"
            p="0.5rem"
          >
            {children}
          </Flex>
        </Flex>
      );
    };

    return (
      <div className="[&_.title]:bg-blue-500 grid grid-cols-3 gap-4 text-center">
        <InfoTable title="Base Happiness">
          <Text size={isMobile ? "xs" : "md"}>
            {pokemonSpecies.base_happiness}
          </Text>
        </InfoTable>
        <InfoTable title="Capture Rate">
          <Text size={isMobile ? "xs" : "md"}>
            {pokemonSpecies.capture_rate}
          </Text>
        </InfoTable>
        <InfoTable title="Egg Groups">
          {pokemonSpecies.egg_groups.map((group) => (
            <Text key={group.name} size={isMobile ? "xs" : "md"}>
              {group.name}
            </Text>
          ))}
        </InfoTable>
        <InfoTable title="Experience Growth">
          <Text size={isMobile ? "xs" : "md"}>
            {pokemonSpecies.growth_rate.name}
          </Text>
          <Text size={isMobile ? "xs" : "md"}>
            <NumberFormatter
              thousandSeparator
              value={
                expGrowthMax[
                  pokemonSpecies.growth_rate.name as keyof typeof expGrowthMax
                ]
              }
            />
          </Text>
        </InfoTable>
        <InfoTable title="Gender Rate">
          {pokemonSpecies.gender_rate == -1 ? (
            <>Genderless</>
          ) : (
            <>
              <Text
                size={isMobile ? "xs" : "md"}
              >{`Male: ${100 - pokemonSpecies.gender_rate * 12.5}%`}</Text>
              <Text
                size={isMobile ? "xs" : "md"}
              >{`Female: ${pokemonSpecies.gender_rate * 12.5}%`}</Text>
            </>
          )}
        </InfoTable>
        <InfoTable title="Base Egg Steps">
          <Text size={isMobile ? "xs" : "md"}>
            <NumberFormatter
              thousandSeparator
              value={pokemonSpecies.hatch_counter * 128}
            />{" "}
            Steps
          </Text>
          <Text
            size={isMobile ? "xs" : "md"}
          >{`${pokemonSpecies.hatch_counter} Cycles`}</Text>
        </InfoTable>
        <InfoTable title="Height">
          <Text size={isMobile ? "xs" : "md"}>{`${feet}' ${inches}"`}</Text>
        </InfoTable>
        <InfoTable title="Weight">
          <Text size={isMobile ? "xs" : "md"}>
            {`${pounds.toFixed(1)} lbs`}
          </Text>
        </InfoTable>
      </div>
    );
  };

  const Stats = () => {
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
      <Card className="gap-2" c="white" bg="var(--secondary)">
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
              <Flex
                direction="row"
                justify="space-between"
                w={isMobile ? "8rem" : "12rem"}
              >
                <Text className="capitalize" size={isMobile ? "xs" : "lg"}>
                  {stat.stat.name}
                </Text>
                <Text size={isMobile ? "xs" : "lg"}>{stat.base_stat}</Text>
              </Flex>
              <Progress
                w="100%"
                value={(stat.base_stat / 255) * 100}
                size="lg"
                color={getColor(stat.base_stat)}
                transitionDuration={200}
              />
              <Flex
                direction="row"
                justify="space-between"
                w={isMobile ? "3.75rem" : "5.5rem"}
              >
                <Text size={isMobile ? "xs" : "lg"}>
                  {stat.stat.name == "hp" ? minHP : minStat}
                </Text>
                <Text size={isMobile ? "xs" : "lg"}>
                  {stat.stat.name == "hp" ? maxHP : maxStat}
                </Text>
              </Flex>
            </div>
          );
        })}
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
          <Flex
            direction="row"
            justify="space-between"
            w={isMobile ? "8rem" : "12rem"}
          >
            <Text size={isMobile ? "xs" : "lg"}>Total</Text>
            <Text size={isMobile ? "xs" : "lg"}>{total}</Text>
          </Flex>
          <div></div>
          <Flex
            direction="row"
            justify="space-between"
            w={isMobile ? "3.75rem" : "5.5rem"}
          >
            <Text size={isMobile ? "xs" : "lg"}>Min</Text>
            <Text size={isMobile ? "xs" : "lg"}>Max</Text>
          </Flex>
        </div>
      </Card>
    );
  };

  const Moves = () => {
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
      <Flex direction="row" justify="center" wrap="wrap" gap="2rem">
        <div className="min-w-1/2 max-w-full">
          <Text size="lg" fw="bold" ta="center" mb="1rem">
            LEARNED MOVES
          </Text>
          <Flex direction="row" justify="center" wrap="wrap" gap="1rem">
            {levelUp.map((move) => (
              <MoveSet
                key={move.move.name}
                moveSet={move}
                condition="level-up"
              />
            ))}
          </Flex>
        </div>
        <div className="min-w-1/2 max-w-full">
          <Text size="lg" fw="bold" ta="center" mb="1rem">
            TM MOVES
          </Text>
          <Flex direction="row" justify="center" wrap="wrap" gap="1rem">
            {tm.map((move) => (
              <MoveSet key={move.move.name} moveSet={move} condition="tm" />
            ))}
          </Flex>
        </div>
      </Flex>
    );
  };

  return (
    <Flex
      direction="column"
      py="1.5rem"
      gap="2rem"
      className={isMobile ? "mx-auto w-[90%]" : "px-6"}
    >
      <DisplayPokemon />
      <Flex
        direction={isMobile ? "column" : "row"}
        justify={isMobile ? "" : "center"}
        align={isMobile ? "" : "center"}
        gap="1rem"
      >
        <DisplayAbility />
        {evolutionChain && (
          <Flex direction="row" justify="center" gap="0.5rem">
            <EvolutionChain chain={evolutionChain.chain} />
          </Flex>
        )}
      </Flex>
      <SpecialInfo />
      <Stats />
      <Moves />
    </Flex>
  );
};

export default Page;
