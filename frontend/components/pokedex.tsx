import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Card,
  Image,
  Text,
  Badge,
  Flex,
  Skeleton,
  SegmentedControl,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getRegionalPokedex } from "@/lib/getRegionalPokedex";
import { getNationalPokedex } from "@/lib/getNationalPokedex";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import typeColors from "@/utils/typeColors";
import gameVersion from "@/utils/gameVersion";

type pkmnType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type dexVersion = "regional" | "national";

const PAGE_SIZE = 50;

const Pokedex = ({ version }: { version: keyof typeof gameVersion }) => {
  const pokedex = gameVersion[version];
  const [dexVersion, setDexVersion] = useState<dexVersion>("regional");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { data: natDex, isLoading: natDexLoading } = useQuery({
    queryKey: ["nationalPokedex"],
    queryFn: () => getNationalPokedex(pokedex.limit),
    staleTime: Infinity,
  });
  const { data: regDex, isLoading: regDexLoading } = useQuery({
    queryKey: ["regionalPokedex"],
    queryFn: () => getRegionalPokedex(version, pokedex.regionalDex),
    staleTime: Infinity,
  });

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

      if (bottom) {
        setVisibleCount((prev) => prev + PAGE_SIZE);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const switchDex = () => {
    setDexVersion((prev) => (prev === "regional" ? "national" : "regional"));
    setVisibleCount(PAGE_SIZE);
  };

  const LoadTypes = ({ types }: { types: pkmnType[] }) => {
    return types.map((data) => (
      <Badge key={data.slot} color={typeColors[data.type.name]}>
        {data.type.name}
      </Badge>
    ));
  };

  const PokemonCard = ({
    entryNumber,
    badgeNumber,
    loading,
  }: {
    entryNumber: number;
    badgeNumber: number;
    loading: boolean;
  }) => {
    let pokemon = natDex?.[entryNumber - 1];

    return (
      <Card
        className="cursor-pointer"
        orientation={`${isMobile ? "horizontal" : "vertical"}`}
        w={`${isMobile ? "20rem" : "14rem"}`}
        withBorder
        shadow="sm"
        onClick={() => {
          if (loading) return;
          router.push(`/pokemon/${pokemon.entryNumber}`);
        }}
      >
        <Skeleton
          h="6rem"
          w={`${isMobile ? "6rem" : "auto"}`}
          visible={loading}
        >
          {!loading && (
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/${pokedex.version}/${pokemon?.entryNumber}.png`}
              fallbackSrc={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon?.entryNumber}.png`}
              alt={pokemon.name}
              className="mx-auto"
              h={`${isMobile ? "auto" : "6rem"}`}
              w={`${isMobile ? "6rem" : "auto"}`}
              fit="contain"
            />
          )}
        </Skeleton>

        <Flex
          direction="column"
          justify="center"
          align={`${isMobile ? "flex-start" : "center"}`}
          className={`${isMobile ? "ml-4" : "mt-2"}`}
        >
          <Flex
            direction={`${isMobile ? "column" : "row"}`}
            align={`${isMobile ? "flex-start" : "center"}`}
            gap="0.5rem"
            mb="0.5rem"
          >
            <Skeleton
              h={`${loading ? "1.5rem" : "auto"}`}
              w={`${loading ? "3rem" : "auto"}`}
              visible={loading}
            >
              {!loading && (
                <Badge variant="outline" size="lg" color="rgb(0, 0, 0)">
                  {`#${badgeNumber}`}
                </Badge>
              )}
            </Skeleton>
            <Skeleton
              h={`${loading ? "1rem" : "auto"}`}
              w={`${loading ? "7rem" : "auto"}`}
              visible={loading}
            >
              {!loading && <Text>{capitalizeFirstLetter(pokemon.name)}</Text>}
            </Skeleton>
          </Flex>

          <Flex
            direction="row"
            gap="0.5rem"
            w={`${loading ? "10rem" : "auto"}`}
          >
            {loading ? (
              <>
                <Skeleton height="1rem" w="50%" visible={true} />
                <Skeleton height="1rem" w="50%" visible={true} />{" "}
              </>
            ) : (
              <>
                {(() => {
                  switch (pokedex.version) {
                    case "generation-iii/ruby-sapphire":
                    case "generation-iii/firered-leafgreen":
                    case "generation-iii/emerald":
                    case "generation-iv/diamond-pearl":
                    case "generation-iv/platinum":
                    case "generation-iv/heartgold-soulsilver":
                    case "generation-v/black-white":
                      if (pokemon.pastTypes.length > 0) {
                        return <LoadTypes types={pokemon.pastTypes} />;
                      } else {
                        return <LoadTypes types={pokemon.currentTypes} />;
                      }
                    default:
                      return <LoadTypes types={pokemon.currentTypes} />;
                  }
                })()}
              </>
            )}
          </Flex>
        </Flex>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <SegmentedControl
        value={dexVersion}
        onChange={switchDex}
        data={[
          { label: "Regional", value: "regional" },
          { label: "National", value: "national" },
        ]}
        size="md"
        px="1rem"
        py="0.5rem"
      />
      <div className="flex justify-center flex-wrap gap-3 my-5">
        {natDexLoading && regDexLoading
          ? Array(visibleCount)
              .fill(null)
              .map((_, idx) => {
                return (
                  <PokemonCard
                    key={idx}
                    entryNumber={idx}
                    badgeNumber={idx}
                    loading={true}
                  />
                );
              })
          : dexVersion == "regional"
            ? regDex?.map((dex) => (
                <div key={dex.title} className="text-center">
                  <div className="text-xl mb-5">{`${capitalizeFirstLetter(dex.title)} Pokedex`}</div>
                  <div className="flex justify-center flex-wrap gap-3 mb-5">
                    {dex.entryNumbers.map(
                      (entryNumber: number, idx: number) => {
                        return (
                          <PokemonCard
                            key={entryNumber}
                            entryNumber={entryNumber}
                            badgeNumber={
                              ["blackWhite", "black2White2"].includes(version)
                                ? idx
                                : idx + 1
                            }
                            loading={false}
                          />
                        );
                      },
                    )}
                  </div>
                </div>
              ))
            : natDex?.slice(0, visibleCount).map((pokemon) => {
                return (
                  <PokemonCard
                    key={pokemon.entryNumber}
                    entryNumber={pokemon.entryNumber}
                    badgeNumber={pokemon.entryNumber}
                    loading={false}
                  />
                );
              })}
      </div>
    </div>
  );
};

export default Pokedex;
