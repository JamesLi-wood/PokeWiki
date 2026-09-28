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
import { useMediaQuery, useScrollIntoView } from "@mantine/hooks";
import LoadPkmnType from "./loadPkmnType";
import gameVersion from "@/utils/gameVersion";

type PokedexProps = {
  version: keyof typeof gameVersion;
  dexKey: string;
  entries: {
    name: string;
    url: string;
  }[];
  victiniClause: boolean;
};

type TypeProps = {
  slot: number;
  type: { name: string; url: string };
};

type PokemonCardProps = {
  pokemon: {
    name: string;
    entryNumber: number;
    currentTypes: TypeProps[];
    pastTypes: TypeProps[];
  };
  badgeNumber: number;
  style: React.CSSProperties;
};

const Pokedex = ({ version, dexKey, entries, victiniClause }: PokedexProps) => {
  const pokedex = gameVersion[version];
  const { pokemons, isLoading, page, paginate, BATCH } = useLoadPokemon(
    dexKey,
    entries,
  );
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 200,
    duration: 0,
  });
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [transition, setTransition] = useState(false);
  const victiniIdx = victiniClause ? -1 : 0;

  useEffect(() => {
    setTransition(false);
    if (!isLoading) {
      setTransition(true);
    }
  }, [isLoading]);

  const SkeletonPokemonCard = () => {
    return (
      <Card
        orientation="vertical"
        bg="var(--secondary)"
        w={isMobile ? "10rem" : "13rem"}
        shadow="sm"
      >
        <Skeleton
          className="skeleton-card-bg"
          h={isMobile ? "4rem" : "6rem"}
          visible={true}
        />
        <Flex direction="column" align="center" className="mt-2">
          <Flex direction="row" align="center" gap="0.5rem" mb="0.5rem">
            <Skeleton
              className="skeleton-card-bg"
              h={isMobile ? "1rem" : "1.5rem"}
              w={isMobile ? "2rem" : "3rem"}
              visible={true}
            />
            <Skeleton
              className="skeleton-card-bg"
              h={isMobile ? "1rem" : "1.5rem"}
              w={isMobile ? "4rem" : "7rem"}
              visible={true}
            />
          </Flex>
          <Flex direction="row" gap="0.5rem" w="100%">
            {Array.from({ length: 2 }, (_, idx) => (
              <Skeleton
                key={idx}
                className="skeleton-card-bg"
                h={isMobile ? "1rem" : "1.5rem"}
                w="50%"
                visible={true}
              />
            ))}
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
        bg="var(--secondary)"
        w={isMobile ? "10rem" : "13rem"}
        onClick={() => {
          router.push(`/pokemon/${pokemon.name}`);
        }}
      >
        <Image
          src={`${pokedex.sprite}/${pokemon.entryNumber}.png`}
          alt={pokemon.name}
          h={isMobile ? "4rem" : "6rem"}
          fit="contain"
        />
        <Flex direction="column" align="center" className="mt-2">
          <Flex direction="row" align="center" gap="0.5rem" mb="0.5rem">
            <Badge
              variant="outline"
              size={isMobile ? "sm" : "lg"}
              color="white"
            >
              {`#${badgeNumber}`}
            </Badge>
            <Text
              className="capitalize"
              c="white"
              size={isMobile ? "xs" : "md"}
            >
              {pokemon.name}
            </Text>
          </Flex>
          <Flex direction="row" gap="0.5rem">
            {(() => {
              switch (version) {
                case "rs":
                case "frlg":
                case "emerald":
                case "dp":
                case "platinum":
                case "hgss":
                case "bw":
                case "bw2":
                  return pokemon.pastTypes.length > 0
                    ? pokemon.pastTypes.map((data) => (
                        <LoadPkmnType
                          key={data.slot}
                          type={data.type.name}
                          isMobile={isMobile}
                        />
                      ))
                    : pokemon.currentTypes.map((data) => (
                        <LoadPkmnType
                          key={data.slot}
                          type={data.type.name}
                          isMobile={isMobile}
                        />
                      ));
                default:
                  return pokemon.currentTypes.map((data) => (
                    <LoadPkmnType
                      key={data.slot}
                      type={data.type.name}
                      isMobile={isMobile}
                    />
                  ));
              }
            })()}
          </Flex>
        </Flex>
      </Card>
    );
  };

  return (
    <Flex
      ref={targetRef}
      direction="row"
      justify="center"
      wrap="wrap"
      gap="1rem"
      m="1rem"
    >
      {isLoading || !pokemons ? (
        Array.from({ length: BATCH }, (_, idx) => {
          return <SkeletonPokemonCard key={idx} />;
        })
      ) : (
        <>
          <Flex
            direction="row"
            justify="center"
            wrap="wrap"
            gap="1rem"
            mb="1.5rem"
          >
            {pokemons.map((pokemon, idx) => {
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
                      badgeNumber={BATCH * page + idx + 1 + victiniIdx}
                    />
                  )}
                </Transition>
              );
            })}
          </Flex>
          <Pagination
            size={isMobile ? "sm" : "md"}
            total={Math.ceil(entries.length / BATCH)}
            value={page + 1}
            onChange={(val) => {
              paginate(val);
              scrollIntoView({
                alignment: "start",
              });
            }}
          />
        </>
      )}
    </Flex>
  );
};

export default Pokedex;
