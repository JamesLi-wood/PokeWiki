import { Text } from "@mantine/core";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-1 py-4 text-center border-t w-4/5 mx-auto">
      <Text>
        Pokémon data provided by{" "}
        <Link
          className="text-blue-500 underline"
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          PokéAPI.
        </Link>
      </Text>
      <Text>
        This is an unofficial fan project and is not affiliated with Nintendo,
        Game Freak, or The Pokémon Company.
      </Text>
    </footer>
  );
};

export default Footer;
