import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useLoadPokemon from "@/hooks/useLoadPokemon";
import {
  Card,
  Image,
  Text,
  Badge,
  Flex,
  Skeleton,
  Pagination,
  Transition,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import typeColors from "@/utils/typeColors";
import gameVersion from "@/utils/gameVersion";

type PokedexProps = {
  version: keyof typeof gameVersion;
  dexKey: string;
  entries: {
    name: string;
    url: string;
  }[];
};

type pkmnType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonCardProps = {
  pokemon: {
    name: string;
    entryNumber: number;
    currentTypes: [];
    pastTypes: [];
  };
  badgeNumber: number;
  style: React.CSSProperties;
};

const Pokedex = ({ version, dexKey, entries }: PokedexProps) => {
  const pokedex = gameVersion[version];
  const [transition, setTransition] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { pokemons, isLoading, page, totalPages, paginate, BATCH } =
    useLoadPokemon(dexKey, entries);

  useEffect(() => {
    setTransition(false);
    if (!isLoading) {
      setTransition(true);
    }
  }, [isLoading]);

  const LoadTypes = ({ types }: { types: pkmnType[] }) => {
    return types.map((data) => (
      <Badge
        key={data.slot}
        color={typeColors[data.type.name]}
        size={`${isMobile ? "xs" : "md"}`}
      >
        {data.type.name}
      </Badge>
    ));
  };

  const SkeletonPokemonCard = () => {
    return (
      <Card
        className="cursor-pointer"
        orientation="vertical"
        w={`${isMobile ? "10rem" : "14rem"}`}
        withBorder
        shadow="sm"
      >
        <Skeleton h={`${isMobile ? "4rem" : "6rem"}`} visible={true} />
        <Flex direction="column" align="center" className="mt-2">
          <Flex direction="row" align="center" gap="0.5rem" mb="0.5rem">
            <Skeleton
              h={`${isMobile ? "1rem" : "1.5rem"}`}
              w={`${isMobile ? "2rem" : "3rem"}`}
              visible={true}
            />
            <Skeleton
              h={`${isMobile ? "1rem" : "1.5rem"}`}
              w={`${isMobile ? "4rem" : "7rem"}`}
              visible={true}
            />
          </Flex>
          <Flex direction="row" gap="0.5rem" w="100%">
            <Skeleton
              h={`${isMobile ? "1rem" : "1.5rem"}`}
              w="50%"
              visible={true}
            />
            <Skeleton
              h={`${isMobile ? "1rem" : "1.5rem"}`}
              w="50%"
              visible={true}
            />
          </Flex>
        </Flex>
      </Card>
    );
  };

  const PokemonCard = ({ pokemon, badgeNumber, style }: PokemonCardProps) => {
    return (
      <Card
        style={style}
        className="cursor-pointer"
        orientation="vertical"
        w={`${isMobile ? "10rem" : "14rem"}`}
        withBorder
        shadow="sm"
        onClick={() => {
          router.push(`/pokemon/${pokemon?.entryNumber}`);
        }}
      >
        <Image
          src={`${pokedex.sprite}/${pokemon?.entryNumber}.png`}
          alt={pokemon?.name}
          h={`${isMobile ? "4rem" : "6rem"}`}
          fit="contain"
        />
        <Flex direction="column" align="center" className="mt-2">
          <Flex direction="row" align="center" gap="0.5rem" mb="0.5rem">
            <Badge
              variant="outline"
              size={`${isMobile ? "sm" : "lg"}`}
              color="rgb(0, 0, 0)"
            >
              {`#${badgeNumber}`}
            </Badge>
            {pokemon && (
              <Text size={`${isMobile ? "xs" : "md"}`}>
                {capitalizeFirstLetter(pokemon.name)}
              </Text>
            )}
          </Flex>
          <Flex direction="row" gap="0.5rem">
            <>
              {(() => {
                switch (version) {
                  case "rubySapphire":
                  case "fireredLeafgreen":
                  case "emerald":
                  case "diamondPearl":
                  case "platinum":
                  case "heartgoldSoulsilver":
                  case "blackWhite":
                  case "black2White2":
                    if (pokemon)
                      return pokemon.pastTypes.length > 0 ? (
                        <LoadTypes types={pokemon.pastTypes} />
                      ) : (
                        <LoadTypes types={pokemon.currentTypes} />
                      );
                  default:
                    if (pokemon)
                      return <LoadTypes types={pokemon.currentTypes} />;
                }
              })()}
            </>
          </Flex>
        </Flex>
      </Card>
    );
  };

  return (
    <div className="flex justify-center flex-wrap gap-3 my-5">
      {isLoading ? (
        Array(50)
          .fill(null)
          .map((_, idx) => {
            return <SkeletonPokemonCard key={idx} />;
          })
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-center flex-wrap gap-3 mb-5">
            {pokemons?.map((pokemon, idx) => {
              return (
                <Transition
                  key={idx}
                  mounted={transition}
                  transition="fade"
                  duration={1000}
                  enterDelay={Math.min(idx * 15, 400)}
                >
                  {(styles) => (
                    <PokemonCard
                      style={styles}
                      pokemon={pokemon}
                      badgeNumber={BATCH * page + idx + 1}
                    />
                  )}
                </Transition>
              );
            })}
          </div>
          <Pagination total={totalPages} value={page + 1} onChange={paginate} />
        </div>
      )}
    </div>
  );
};

export default Pokedex;
