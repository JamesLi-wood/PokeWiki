"use client";
import Pokedex from "@/components/pokedex";
import { useMediaQuery } from "@mantine/hooks";

const Page = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div>
      <div className={`${isMobile ? "w-full" : "w-[80%]"} mx-auto`}>
        <div className="text-center">Pokedex</div>
        <Pokedex ver="diamondPearl" />
      </div>
    </div>
  );
};

export default Page;
