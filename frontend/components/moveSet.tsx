import { Card, Image, Text, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useGetMove from "@/hooks/useGetMove";
import LoadPkmnType from "./loadPkmnType";
import { GiBroadsword, GiHeavyArrow } from "react-icons/gi";
import { GoHorizontalRule } from "react-icons/go";
import { PokemonData } from "@/types/pokemonData";

type Props = {
  moveSet: PokemonData["moves"][number];
  condition: "tm" | "level-up";
};

const MoveSet = ({ moveSet, condition }: Props) => {
  const { move, isLoading, error, isError } = useGetMove(
    moveSet.move.name,
    moveSet.move.url,
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isLoading || !move) return <div></div>;

  return (
    <Card
      className="gap-4"
      c="white"
      orientation="vertical"
      bg="var(--secondary) url('/pokeball.png') no-repeat bottom left"
      maw="100%"
      w="25rem"
    >
      <Flex direction="row" gap="1rem" align="center">
        <Text
          className="capitalize w-[70%]"
          fw="bold"
          size={isMobile ? "sm" : "md"}
        >
          {move.name}
        </Text>
        <Flex direction="column" gap="0.5rem">
          <LoadPkmnType type={move.type.name} isMobile={isMobile} />
          <Image
            src={`/${move.damage_class.name}.png`}
            alt={`${move.damage_class.name}`}
            w={isMobile ? "2rem" : "3rem"}
            h="auto"
            fit="contain"
          />
        </Flex>
      </Flex>
      <Flex
        direction="row"
        justify="center"
        align="center"
        gap="2.5rem"
        h="2.5rem"
      >
        {condition == "level-up" && (
          <Text size="md">{`Lv ${moveSet.version_group_details[0].level_learned_at}`}</Text>
        )}
        <Flex direction="row" align="center" gap="0.5rem">
          <GiBroadsword />
          <Text size="md">
            {move.power == null ? <GoHorizontalRule /> : move.power}
          </Text>
        </Flex>
        <Flex direction="row" align="center" gap="0.5rem">
          <GiHeavyArrow />
          <Text size="md">
            {move.accuracy == null ? <GoHorizontalRule /> : move.accuracy}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default MoveSet;
