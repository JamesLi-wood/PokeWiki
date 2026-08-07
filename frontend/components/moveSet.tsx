import { Card, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useGetMove from "@/hooks/useGetMove";
import LoadPkmnType from "./loadPkmnType";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
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
      className="gap-4 mb-5"
      c="white"
      orientation="vertical"
      bg="var(--secondary)"
      maw="100%"
      w="25rem"
    >
      <div className="flex gap-4 items-center">
        <div className="w-[70%]">{capitalizeFirstLetter(move.name)}</div>
        <div className="flex flex-col gap-2 w-auto">
          <LoadPkmnType type={move.type.name} isMobile={isMobile} />
          <Image
            src={`/${move.damage_class.name}.png`}
            alt={`${move.damage_class.name}`}
            w={isMobile ? "2rem" : "3rem"}
            h="auto"
            fit="contain"
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-10 h-10">
        {condition == "level-up" && (
          <div>{`Lv ${moveSet.version_group_details[0].level_learned_at}`}</div>
        )}
        <div className="flex items-center gap-2">
          <GiBroadsword />
          <div>{move.power == null ? <GoHorizontalRule /> : move.power}</div>
        </div>
        <div className="flex items-center gap-2">
          <GiHeavyArrow />
          <div>
            {move.accuracy == null ? <GoHorizontalRule /> : move.accuracy}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MoveSet;
