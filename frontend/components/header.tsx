import Link from "next/link";
import { Text, Flex } from "@mantine/core";

const Header = () => {
  const pages = [
    { name: "Home", href: "/" },
    { name: "Guess", href: "/guess" },
  ];

  return (
    <header className="flex justify-between mx-auto rounded-3xl mt-5 bg-(--secondary) w-4/5 p-4">
      <Text size="sm">PokeWiki</Text>
      <Flex direction="row" gap="0.25rem">
        {pages.map((page) => (
          <Link key={page.name} href={page.href}>
            <Text
              className="hover:bg-white hover:text-black rounded-3xl"
              size="sm"
              px="0.75rem"
            >
              {page.name}
            </Text>
          </Link>
        ))}
      </Flex>
    </header>
  );
};

export default Header;
