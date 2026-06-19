"use client";
import { useState } from "react";
import usePokedex from "@/hooks/usePokedex";
import Pokedex from "@/components/pokedex";
import { useMediaQuery } from "@mantine/hooks";
import { SegmentedControl } from "@mantine/core";

type dexVersion = "regional" | "national";

const Page = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { natDex, regDex } = usePokedex("scarletViolet");
  const [dexVersion, setDexVersion] = useState<dexVersion>("regional");
  const switchDex = () => {
    setDexVersion((prev) => (prev === "regional" ? "national" : "regional"));
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-4">
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
      <div className={`${isMobile ? "w-full" : "w-[80%]"} mx-auto text-center`}>
        {dexVersion == "regional" ? (
          <>
            {regDex?.map((dex) => (
              <div key={dex.title}>
                <div>{dex.title}</div>
                <Pokedex
                  version="scarletViolet"
                  dexKey={dex.title}
                  entries={dex.entries}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <div>{natDex.title}</div>
            <Pokedex
              version="scarletViolet"
              dexKey={natDex.title}
              entries={natDex.entries}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
