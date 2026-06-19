import { useRouter } from "next/navigation";
import useLoadPokemon from "@/hooks/useLoadPokemon";
import { Card, Image, Text, Badge, Flex, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
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

type pkmnData = {
  name: string;
  entryNumber: number;
  currentTypes: [];
  pastTypes: [];
};

type entries = {
  name: string;
  url: string;
};

const Pokedex = ({
  version,
  dexKey,
  entries,
}: {
  version: keyof typeof gameVersion;
  dexKey: string;
  entries: entries[];
}) => {
  const pokedex = gameVersion[version];
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { pokemons, isLoading, paginateUp, paginateDown } = useLoadPokemon(
    dexKey,
    entries,
  );

  const LoadTypes = ({ types }: { types: pkmnType[] }) => {
    return types.map((data) => (
      <Badge key={data.slot} color={typeColors[data.type.name]}>
        {data.type.name}
      </Badge>
    ));
  };

  const SkeletonPokemonCard = () => {
    return (
      <Card
        className="cursor-pointer"
        orientation={`${isMobile ? "horizontal" : "vertical"}`}
        w={`${isMobile ? "20rem" : "14rem"}`}
        withBorder
        shadow="sm"
      >
        <Skeleton h="6rem" w={`${isMobile ? "6rem" : "auto"}`} visible={true} />
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
            <Skeleton h={"1.5rem"} w={"3rem"} visible={true} />
            <Skeleton h={"1rem"} w={"7rem"} visible={true}></Skeleton>
          </Flex>

          <Flex direction="row" gap="0.5rem" w={"10rem"}>
            <Skeleton height="1rem" w="50%" visible={true} />
            <Skeleton height="1rem" w="50%" visible={true} />
          </Flex>
        </Flex>
      </Card>
    );
  };

  const PokemonCard = ({
    pokemon,
    badgeNumber,
  }: {
    pokemon: pkmnData;
    badgeNumber: number;
  }) => {
    return (
      <Card
        className="cursor-pointer"
        orientation={`${isMobile ? "horizontal" : "vertical"}`}
        w={`${isMobile ? "20rem" : "14rem"}`}
        withBorder
        shadow="sm"
        onClick={() => {
          router.push(`/pokemon/${pokemon?.entryNumber}`);
        }}
      >
        <Image
          src={`${pokedex.sprite}/${pokemon?.entryNumber}.png`}
          alt={pokemon?.name}
          h={`${isMobile ? "auto" : "6rem"}`}
          w={`${isMobile ? "6rem" : "auto"}`}
          fit="contain"
        />
        <Flex
          direction="column"
          justify="center"
          align="center"
          className={`${isMobile ? "ml-4" : "mt-2"}`}
        >
          <Flex
            direction={`${isMobile ? "column" : "row"}`}
            align={`${isMobile ? "flex-start" : "center"}`}
            gap="0.5rem"
            mb="0.5rem"
          >
            <Badge variant="outline" size="lg" color="rgb(0, 0, 0)">
              {`#${badgeNumber}`}
            </Badge>
            {pokemon && <Text>{capitalizeFirstLetter(pokemon.name)}</Text>}
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
        <div>
          <div className="flex justify-center flex-wrap gap-3 mb-5">
            {pokemons?.map((pokemon) => {
              return (
                <PokemonCard
                  key={pokemon.entryNumber}
                  pokemon={pokemon}
                  badgeNumber={pokemon.entryNumber}
                />
              );
            })}
          </div>
          <div>
            <button onClick={paginateDown}>PREV</button>
            <button onClick={paginateUp}>NEXT</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
