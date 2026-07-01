"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { Drawer, SegmentedControl, Button } from "@mantine/core";
import Pokedex from "@/components/pokedex";
import usePokedex from "@/hooks/usePokedex";
import gameVersion from "@/utils/gameVersion";

type dexVersion = "regional" | "national";

const Page = () => {
  const slug = useParams().region;

  if (typeof slug !== "string") return <div>ERROR</div>;
  if (!(slug in gameVersion)) return <div>Game version not found</div>;

  const version = slug as keyof typeof gameVersion;
  const gameTitles = Object.entries(gameVersion).map(([key, game]) => ({
    key,
    title: game.title,
  }));
  const victiniClause = ["bw", "bw2"].includes(slug);
  const { natDex, regDex } = usePokedex(version);
  const [opened, { open, close }] = useDisclosure(false);
  const [dexVersion, setDexVersion] = useState<dexVersion>("regional");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const switchDex = () => {
    setDexVersion((prev) => (prev === "regional" ? "national" : "regional"));
  };

  return (
    <div className="flex flex-col items-center mt-5 gap-4">
      <div>
        <Drawer opened={opened} onClose={close} title="Other Games">
          {gameTitles.map((game) => (
            <div
              key={game.key}
              className={`${slug == game.key && "bg-(--secondary)"} hover:bg-(--secondary) p-2 my-2 cursor-pointer`}
              onClick={() => {
                router.push(`/region/${game.key}/pokedex`);
              }}
            >
              {game.title}
            </div>
          ))}
        </Drawer>
        <Button
          variant="default"
          bg="var(--secondary)"
          c="white"
          bd="none"
          onClick={open}
        >
          View Other Games
        </Button>
      </div>
      <SegmentedControl
        bg="var(--secondary)"
        color="var(--info)"
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
                <div className="font-bold">{dex.title}</div>
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
            <div className="font-bold">{natDex.title}</div>
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
