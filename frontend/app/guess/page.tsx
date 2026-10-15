"use client";
import { useState, useRef, useEffect } from "react";
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
  Modal,
  RingProgress,
} from "@mantine/core";
import { useCounter, useMediaQuery, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import regions from "@/utils/regions";

type GameState = "select" | "guess";
type GuessingRegions = {
  name: string;
  startIdx: number;
  amount: number;
  selected: boolean;
};
type SidebarProps = {
  revealPokemon: (fn: () => void) => void;
};

const Page = () => {
  const [gameState, setGamestate] = useState<GameState>("select");
  const [guessingRegions, setGuessingRegions] = useState<GuessingRegions[]>([]);
  const gameRegions = Object.keys(regions) as Array<keyof typeof regions>;
  const regionsClone = structuredClone(regions);

  const Selecting = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
      <Flex
        direction="column"
        align="center"
        bg="var(--secondary)"
        gap="1rem"
        m="auto"
        p="1rem"
        w="auto"
        maw="80%"
      >
        <Text fw="bold">Select Regions</Text>
        <div className="grid grid-cols-3 gap-4">
          {gameRegions.map((region) => (
            <Checkbox.Card
              w="10rem"
              maw="100%"
              key={region}
              onChange={(event) => {
                regionsClone[region].selected = event;
              }}
            >
              <Flex direction="row" align="center" gap="0.5rem" p="0.5rem">
                <Checkbox.Indicator radius="xl" />
                <Text size={isMobile ? "xs" : "md"} className="capitalize">
                  {region}
                </Text>
              </Flex>
            </Checkbox.Card>
          ))}
        </div>
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
      </Flex>
    );
  };

  const Guessing = () => {
    const { data: natDex } = useQuery({
      queryKey: ["natDex"],
      queryFn: () => nationalPokedex(),
      staleTime: Infinity,
    });
    const imageRefs = useRef<Record<string, HTMLImageElement | null>>({});
    const revealFnRef = useRef<(() => void) | null>(null);

    const reveal = (name: string) => {
      const image = imageRefs.current[name];
      if (image && !image.dataset.name) {
        image.dataset.name = name;
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image.dataset.id}.png`;
        const card = image.parentElement;
        if (card) card.classList.toggle("reveal");
        revealFnRef.current?.();
      }
    };

    const Sidebar = ({ revealPokemon }: SidebarProps) => {
      const [opened, { open, close }] = useDisclosure(false);
      const [count, countHandler] = useCounter(0);
      const [revealed, revealHandler] = useCounter(0);
      const isMobile = useMediaQuery("(max-width: 768px)");
      const length = guessingRegions.reduce(
        (sum, region) => sum + region.amount,
        0,
      );

      useEffect(() => {
        if (count == length) open();
      }, [count]);

      useEffect(() => {
        revealPokemon(() => {
          countHandler.increment();
          revealHandler.increment();
        });
      }, [revealPokemon]);

      const findName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value.toLowerCase();
        const image = imageRefs.current[name];
        if (image && !image.dataset.name) {
          image.dataset.name = name;
          image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image.dataset.id}.png`;
          const card = image.parentElement;
          if (card) card.classList.toggle("correct");
          countHandler.increment();
          e.target.value = "";
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
          }
        });
        revealHandler.set(revealed + length - count);
        countHandler.set(length);
      };

      return (
        <>
          <Modal
            opened={opened}
            onClose={close}
            title="Results"
            c="black"
            centered
          >
            <Flex direction="column" align="center">
              <Flex direction="row" justify="space-around" w="100%">
                <Text>{`${length - revealed} Guessed`}</Text>
                <Text>{`${revealed} Revealed`}</Text>
              </Flex>
              <RingProgress
                label={
                  <Text ta="center">
                    {Math.ceil(((length - revealed) / length) * 100)}%
                  </Text>
                }
                size={150}
                sections={[
                  {
                    value: (revealed / length) * 100,
                    color: "red",
                  },
                  {
                    value: ((length - revealed) / length) * 100,
                    color: "green",
                  },
                ]}
              />
              <Button
                onClick={() => {
                  setGamestate("select");
                }}
              >
                Play Again
              </Button>
            </Flex>
          </Modal>
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
            <Text size={isMobile ? "xs" : "md"}>
              Click on the card to reveal
            </Text>
            <Flex direction={isMobile ? "row" : "column"} gap="0.5rem">
              <Button size={isMobile ? "xs" : "md"} onClick={revealAll}>
                Reveal All
              </Button>
              <Button
                size={isMobile ? "xs" : "md"}
                onClick={() => setGamestate("select")}
              >
                Reset
              </Button>
            </Flex>
          </Flex>
        </>
      );
    };

    return (
      <Flex className="flex-row max-[768px]:flex-col-reverse">
        <Sidebar
          revealPokemon={(fn) => {
            revealFnRef.current = fn;
          }}
        />
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
                    <Card
                      key={idx}
                      className="cursor-pointer border border-white"
                      padding="0.5rem"
                      bg="var(--secondary)"
                      onClick={() => reveal(name)}
                    >
                      <Image
                        className="h-16 w-16 max-[768px]:h-12 max-[768px]:w-12"
                        src="pokeball.png"
                        data-id={region.startIdx + idx}
                        ref={(element) => {
                          imageRefs.current[name] = element;
                        }}
                      />
                    </Card>
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
