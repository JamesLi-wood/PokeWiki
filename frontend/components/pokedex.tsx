import { useEffect, useState } from "react";
import { Card, Image, Text, Badge, Flex, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import typeColors from "@/utils/typeColors";

type version =
  | "generation-iii/ruby-sapphire"
  | "generation-iii/firered-leafgreen"
  | "generation-iii/emerald"
  | "generation-iv/diamond-pearl"
  | "generation-iv/platinum"
  | "generation-iv/heartgold-soulsilver"
  | "generation-v/black-white"
  | "generation-vi/x-y"
  | "generation-vi/omegaruby-alphasapphire"
  | "generation-vii/ultra-sun-ultra-moon"
  | "generation-viii/brilliant-diamond-shining-pearl"
  | "generation-ix/scarlet-violet";

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

type pkmnType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

const PAGE_SIZE = 50;

const Pokedex = ({ limit, version }: { limit: number; version?: version }) => {
  const [national, setNational] = useState<natDex[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const cached = localStorage.getItem("natDex");

    if (cached) {
      setNational(JSON.parse(cached).slice(0, limit));
      setLoading(false);
      return;
    }

    fetch("https://pokeapi.co/api/v2/pokedex/1")
      .then((res) => res.json())
      .then(async (data) => {
        const dex = await Promise.all(
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

        localStorage.setItem("natDex", JSON.stringify(dex));
        setNational(dex.slice(0, limit));
        setLoading(false);
      });
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

  const LoadTypes = ({ types }: { types: pkmnType[] }) => {
    return types.map((data) => (
      <Badge key={data.slot} color={typeColors[data.type.name]}>
        {data.type.name}
      </Badge>
    ));
  };

  return (
    <div className="flex justify-center flex-wrap gap-3 mb-5">
      {(loading
        ? Array(visibleCount).fill(null)
        : national.slice(0, visibleCount)
      ).map((pokemon, idx) => {
        return (
          <Card
            key={idx}
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
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/${version}/${pokemon?.entryNumber}.png`}
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
                      {`#${pokemon.entryNumber}`}
                    </Badge>
                  )}
                </Skeleton>
                <Skeleton
                  h={`${loading ? "1rem" : "auto"}`}
                  w={`${loading ? "7rem" : "auto"}`}
                  visible={loading}
                >
                  {!loading && (
                    <Text>{capitalizeFirstLetter(pokemon.name)}</Text>
                  )}
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
                      switch (version) {
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
      })}
    </div>
  );
};

export default Pokedex;
