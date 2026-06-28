"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useMediaQuery } from "@mantine/hooks";
import { SegmentedControl } from "@mantine/core";
import Pokedex from "@/components/pokedex";
import usePokedex from "@/hooks/usePokedex";
import gameVersion from "@/utils/gameVersion";

type dexVersion = "regional" | "national";

const Page = () => {
  const slug = useParams().region;

  if (typeof slug !== "string") return <div>ERROR</div>;
  if (!(slug in gameVersion)) return <div>Game version not found</div>;

  const version = slug as keyof typeof gameVersion;
  const victiniClause = ["bw", "bw2"].includes(slug);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { natDex, regDex } = usePokedex(version);
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
      <div className={`${isMobile ? "w-full" : "w-[90%]"} mx-auto text-center`}>
        {dexVersion == "regional" ? (
          <>
            {regDex?.map((dex) => (
              <div key={dex.title}>
                <div>{dex.title}</div>
                <Pokedex
                  version={version}
                  dexKey={dex.title}
                  entries={dex.entries}
                  victiniClause={victiniClause}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <div>{natDex.title}</div>
            <Pokedex
              version={version}
              dexKey={natDex.title}
              entries={natDex.entries}
              victiniClause={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
