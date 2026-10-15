"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Autocomplete, Text, Image, Card, Flex, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { nationalPokedex } from "@/lib/getNationalPokedex";
import gameVersion from "@/utils/gameVersion";

const Page = () => {
  const { data: natDex } = useQuery({
    queryKey: ["natDex"],
    queryFn: () => nationalPokedex(),
    staleTime: Infinity,
  });
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const gameTitles = Object.entries(gameVersion).map(([key, game]) => ({
    key,
    data: game,
  }));

  return (
    <Flex direction="column" mx="auto" w="80%" py="1rem" gap="1rem">
      <Flex
        direction={isMobile ? "column" : "row"}
        align={isMobile ? "center" : ""}
        justify="center"
        gap="1rem"
      >
        <Text
          c="white"
          maw="80%"
          w={isMobile ? "15rem" : "21rem"}
          size={isMobile ? "xs" : "md"}
        >
          With 1000+ pokémon out there, finding the one you're looking for can
          be quite a challenge! Don't worry, just start typing and you'll track
          down your pokémon in no time!
        </Text>
        <Autocomplete
          label="Find your pokémon"
          placeholder="Type a pokémon"
          data={natDex?.entries.map(
            (data: { name: string; url: string }) => data.name,
          )}
          onOptionSubmit={(name) => {
            router.push(`/pokemon/${name}`);
          }}
          maw="80%"
          w="20rem"
          limit={5}
          size={isMobile ? "xs" : "sm"}
        />
      </Flex>
      <Text className="text-center" size={isMobile ? "md" : "lg"} fw="bold">
        Search Pokedexes
      </Text>
      <Flex direction="row" justify="center" wrap="wrap" gap="2rem">
        {gameTitles.map((game) => (
          <Card
            key={game.key}
            orientation="vertical"
            className="items-center"
            bg="var(--secondary)"
            p={0}
            w={isMobile ? "15rem" : "20rem"}
          >
            <Image
              fit="contain"
              src={game.data.banner}
              h={isMobile ? 140 : 190}
            />
            <Flex
              direction="column"
              c="white"
              align="center"
              justify="center"
              px="0.5rem"
              py="1rem"
              gap="0.5rem"
            >
              <Text fw="bold" size={isMobile ? "sm" : "md"}>
                {game.data.title}
              </Text>
              <Text className="text-center" size={isMobile ? "xs" : "md"}>
                {game.data.summary}
              </Text>
            </Flex>
            <Button
              variant="outline"
              color="white"
              size={isMobile ? "xs" : "sm"}
              w="50%"
              mb="1rem"
              onClick={() => {
                router.push(`pokedex/${game.key}`);
              }}
            >
              View Pokedex
            </Button>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default Page;
