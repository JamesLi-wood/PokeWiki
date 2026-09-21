"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { Drawer, SegmentedControl, Button, Text } from "@mantine/core";
import Pokedex from "@/components/pokedex";
import ErrorPage from "@/components/errorPage";
import usePokedex from "@/hooks/usePokedex";
import gameVersion from "@/utils/gameVersion";

type dexVersion = "regional" | "national";

const Page = () => {
  const slug = useParams().region;

  if (typeof slug !== "string")
    return <ErrorPage title={"MissingNo has appeared."} />;
  if (!(slug in gameVersion))
    return <ErrorPage title={"This region doesn't exist... yet."} />;

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
        <Drawer
          opened={opened}
          onClose={close}
          title="Other Games"
          size={isMobile ? "70%" : "md"}
        >
          {gameTitles.map((game) => (
            <Text
              key={game.key}
              className={`${slug == game.key && "bg-(--secondary)"} hover:bg-(--secondary) cursor-pointer`}
              p="0.5rem"
              my="0.5rem"
              size={isMobile ? "xs" : "md"}
              onClick={() => {
                router.push(`/pokedex/${game.key}`);
              }}
            >
              {game.title}
            </Text>
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
                <Text
                  className="capitalize"
                  fw="bold"
                >{`${dex.title} Pokedex`}</Text>
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
            <Text className="capitalize" fw="bold">
              {natDex.title}
            </Text>
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
