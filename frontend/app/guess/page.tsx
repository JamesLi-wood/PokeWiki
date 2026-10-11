"use client";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { nationalPokedex } from "@/lib/getNationalPokedex";
import {
  Checkbox,
  Button,
  Text,
  Flex,
  Card,
  Image,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useCounter, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import regions from "@/utils/regions";

type GameState = "select" | "guess";
type GuessingRegions = {
  name: string;
  startIdx: number;
  amount: number;
  selected: boolean;
};

const Page = () => {
  const [gameState, setGamestate] = useState<GameState>("select");
  const [guessingRegions, setGuessingRegions] = useState<GuessingRegions[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const gameRegions = Object.keys(regions) as Array<keyof typeof regions>;
  const regionsClone = structuredClone(regions);

  const Selecting = () => {
    return (
      <div>
        {gameRegions.map((region) => (
          <Checkbox.Card
            key={region}
            onChange={(event) => {
              regionsClone[region].selected = event;
            }}
          >
            <Flex direction="row">
              <Checkbox.Indicator />
              <Text>{region}</Text>
            </Flex>
          </Checkbox.Card>
        ))}
        <Button
          onClick={() => {
            const selectedRegions = Object.entries(regionsClone)
              .filter(([_, data]) => data.selected)
              .map(([region, data]) => ({
                name: region,
                ...data,
              }));

            if (selectedRegions.length == 0) {
              notifications.show({
                title: "Error",
                message: "Please select at least one region.",
                color: "red",
              });
            } else {
              setGuessingRegions(selectedRegions);
              setGamestate("guess");
            }
          }}
        >
          Submit
        </Button>
      </div>
    );
  };

  const Guessing = () => {
    const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});
    const length = guessingRegions.reduce(
      (sum, region) => sum + region.amount,
      0,
    );
    const { data: natDex } = useQuery({
      queryKey: ["natDex"],
      queryFn: () => nationalPokedex(),
      staleTime: Infinity,
    });
    const [count, handlers] = useCounter(0);

    const findName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value.toLowerCase();
      const image = imageRefs.current[name];
      if (image && !image.dataset.name) {
        image.dataset.name = name;
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image.dataset.id}.png`;
        const card = image.parentElement;
        if (card) card.classList.toggle("correct");
        handlers.increment();
        e.target.value = "";
      }
    };

    const reveal = (name: string) => {
      const image = imageRefs.current[name];
      if (image && !image.dataset.name) {
        image.dataset.name = name;
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image.dataset.id}.png`;
        const card = image.parentElement;
        if (card) card.classList.toggle("reveal");
        handlers.increment();
      }
    };

    const revealAll = () => {
      const allRefs = Object.entries(imageRefs.current);
      allRefs.map((ref) => {
        const name = ref[0];
        const imgRef = ref[1];
        if (imgRef && !imgRef.dataset.name) {
          imgRef.dataset.name = name;
          imgRef.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgRef.dataset.id}.png`;
          const card = imgRef.parentElement;
          if (card) card.classList.toggle("reveal");
          handlers.set(length);
        }
      });
    };

    return (
      <Flex direction={isMobile ? "column-reverse" : "row"}>
        <Flex
          direction="column"
          className={`${isMobile ? "bottom-0" : "top-0"} sticky z-10`}
          bg="var(--secondary)"
          gap="0.5rem"
          h={isMobile ? "auto" : "100vh"}
          p="1rem"
          m="1rem"
        >
          <TextInput
            label={`${count} / ${length} revealed`}
            placeholder="Enter name"
            onChange={findName}
            w="10rem"
            size={isMobile ? "xs" : "md"}
          />
          <Text size={isMobile ? "xs" : "md"}>Click on the card to reveal</Text>
          <Button size={isMobile ? "xs" : "md"} onClick={revealAll}>
            Reveal All
          </Button>
        </Flex>

        <Flex direction="column" p="2rem" gap="3rem">
          {guessingRegions.map((region) => (
            <div key={region.name}>
              <Text className="capitalize" pb="0.5rem" fw="bold" ta="center">
                {region.name}
              </Text>
              <Flex justify="center" wrap="wrap" gap="0.5rem">
                {Array.from({ length: region.amount }, (_, idx) => {
                  const name = natDex?.entries[region.startIdx + idx - 1].name;
                  return (
                    <Tooltip.Floating
                      key={idx}
                      label={name}
                      disabled={!imageRefs.current[name]?.dataset.name}
                    >
                      <Card
                        className="cursor-pointer border border-white"
                        padding="0.5rem"
                        bg="var(--secondary)"
                        onClick={() => reveal(name)}
                      >
                        <Image
                          src="pokeball.png"
                          h={isMobile ? "3rem" : "4rem"}
                          w={isMobile ? "3rem" : "4rem"}
                          data-id={region.startIdx + idx}
                          ref={(element) => {
                            imageRefs.current[name] = element;
                          }}
                        />
                      </Card>
                    </Tooltip.Floating>
                  );
                })}
              </Flex>
            </div>
          ))}
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      {gameState == "select" && <Selecting />}
      {gameState == "guess" && <Guessing />}
    </>
  );
};

export default Page;
