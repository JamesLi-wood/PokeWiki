import { useEffect, useState } from "react";
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
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import typeColors from "@/utils/typeColors";
import gameVersion from "@/utils/gameVersion";

type pkmnData = {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
};

type natDex = {
  name: string;
  entryNumber: number;
  currentTypes: [];
  pastTypes: [];
};

type regDex = {
  title: string;
  entryNumbers: number[];
};

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
  const [natDex, setNatDex] = useState<natDex[]>([]);
  const [regDex, setRegDex] = useState<regDex[]>([]);
  const [dexVersion, setDexVersion] = useState<dexVersion>("regional");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const loadRegional = async () => {
      const regionalDex = await Promise.all(
        pokedex.regionalDex.map(async (url) => {
          const response = await fetch(url);
          const data = await response.json();

          const entryNumbers = data.pokemon_entries.map((pokemon: pkmnData) => {
            return Number(pokemon.pokemon_species.url.match(/\d+/g)?.pop());
          });

          return {
            title: data.name,
            entryNumbers: entryNumbers,
          };
        }),
      );
      setRegDex(regionalDex);

      const cached = localStorage.getItem("natDex");
      if (cached) {
        setNatDex(JSON.parse(cached).slice(0, pokedex.limit));
        setLoading(false);
        return;
      }

      const response = await fetch("https://pokeapi.co/api/v2/pokedex/1");
      const data = await response.json();
      const nationalDex = await Promise.all(
        data.pokemon_entries.map(async (pokemon: pkmnData) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.entry_number}`,
          );

          if (!response.ok) {
            return {
              name: "",
              entryNumber: 0,
              currentTypes: [],
              pastTypes: [],
            };
          }

          const extraPkmnData = await response.json();

          return {
            name: pokemon.pokemon_species.name,
            entryNumber: pokemon.entry_number,
            currentTypes: extraPkmnData.types,
            pastTypes:
              extraPkmnData.past_types.length > 0
                ? extraPkmnData.past_types[0].types
                : [],
          };
        }),
      );

      localStorage.setItem("natDex", JSON.stringify(nationalDex));
      setNatDex(nationalDex.slice(0, pokedex.limit));
      setLoading(false);
    };

    loadRegional();
  }, []);

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
  }: {
    entryNumber: number;
    badgeNumber: number;
  }) => {
    let pokemon = natDex[entryNumber - 1];

    return (
      <Card
        orientation={`${isMobile ? "horizontal" : "vertical"}`}
        w={`${isMobile ? "20rem" : "14rem"}`}
        withBorder
        shadow="sm"
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
              alt={pokemon?.name}
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
        {loading
          ? Array(visibleCount)
              .fill(null)
              .map((_, idx) => {
                return (
                  <PokemonCard key={idx} entryNumber={idx} badgeNumber={idx} />
                );
              })
          : dexVersion == "regional"
            ? regDex.map((dex) => (
                <div key={dex.title} className="text-center">
                  <div className="text-xl mb-5">{`${capitalizeFirstLetter(dex.title)} Pokedex`}</div>
                  <div className="flex justify-center flex-wrap gap-3 mb-5">
                    {dex.entryNumbers.map((entryNumber, idx) => {
                      return (
                        <PokemonCard
                          key={entryNumber}
                          entryNumber={entryNumber}
                          badgeNumber={
                            ["blackWhite", "black2White2"].includes(version)
                              ? idx
                              : idx + 1
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              ))
            : natDex.slice(0, visibleCount).map((pokemon) => {
                return (
                  <PokemonCard
                    key={pokemon.entryNumber}
                    entryNumber={pokemon.entryNumber}
                    badgeNumber={pokemon.entryNumber}
                  />
                );
              })}
      </div>
    </div>
  );
};

export default Pokedex;
