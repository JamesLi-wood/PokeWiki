import { MoveData } from "@/types/moveData";

type MoveType = {
  moveData: MoveData;
};

export const getMove = async (url: string): Promise<MoveType> => {
  const moveResponse = await fetch(url);
  const moveData = await moveResponse.json();
  return { moveData };
};
