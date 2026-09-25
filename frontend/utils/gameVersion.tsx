const gameVersion = {
  rs: {
    title: "Ruby / Sapphire",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/4/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire",
    summary:
      "The first Pokémon games on the Game Boy Advance, introducing Abilities, Double Battles, and Pokémon Contests.",
    banner: "banners/rs.jpg",
    limit: 386,
  },
  frlg: {
    title: "Firered / Leafgreen",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/2/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen",
    summary:
      "Remade the original Kanto games with updated graphics, mechanics, and connectivity for the Game Boy Advance.",
    banner: "banners/frlg.png",
    limit: 386,
  },
  emerald: {
    title: "Emerald",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/4/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald",
    summary:
      "Expanded Hoenn with the Battle Frontier and centered its legendary storyline around Rayquaza.",
    banner: "banners/emerald.jpg",
    limit: 386,
  },
  dp: {
    title: "Diamond / Pearl",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/5/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl",
    summary:
      "The first main-series Pokémon games on Nintendo DS, introducing online trading and battling through Nintendo Wi-Fi.",
    banner: "banners/dp.jpg",
    limit: 493,
  },
  platinum: {
    title: "Platinum",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/6/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/",
    summary:
      "Expanded Sinnoh with the Distortion World, new forms, and an enhanced storyline centered around Giratina.",
    banner: "banners/platinum.png",
    limit: 493,
  },
  hgss: {
    title: "Heartgold / Soulsilver",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/7/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver",
    summary:
      "DS remakes of Gold and Silver featuring Pokémon following you and returning adventures across Johto and Kanto.",
    banner: "banners/hgss.png",
    limit: 493,
  },
  bw: {
    title: "Black / White",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/8/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white",
    summary:
      "Introduced 156 new Pokémon and initially restricted the Pokédex to entirely new species.",
    banner: "banners/bw.png",
    limit: 649,
  },
  bw2: {
    title: "Black 2 / White 2",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/9/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/",
    summary:
      "The first direct Pokémon sequels, continuing Black and White's story two years later.",
    banner: "banners/bw2.jpg",
    limit: 649,
  },
  xy: {
    title: "X / Y",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/12/",
      "https://pokeapi.co/api/v2/pokedex/13/",
      "https://pokeapi.co/api/v2/pokedex/14/",
    ],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire",
    summary:
      "The first main-series Pokémon games with fully 3D environments and character models, introducing Mega Evolution.",
    banner: "banners/xy.jpg",
    limit: 721,
  },
  oras: {
    title: "Omegaruby / Alphasapphire",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/15/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/omegaruby-alphasapphire",
    summary:
      "Hoenn remakes featuring Mega Evolution, Primal Reversion, and expanded post-game content.",
    banner: "banners/oras.png",
    limit: 721,
  },
  sm: {
    title: "Sun / Moon",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/17/",
      "https://pokeapi.co/api/v2/pokedex/18/",
      "https://pokeapi.co/api/v2/pokedex/19/",
      "https://pokeapi.co/api/v2/pokedex/20/",
    ],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon",
    summary:
      "Replaced traditional Gyms with Island Challenges and introduced regional forms, Z-Moves, and Ultra Beasts.",
    banner: "banners/sm.jpg",
    limit: 807,
  },
  usum: {
    title: "Ultra Sun / Ultra Moon",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/22/",
      "https://pokeapi.co/api/v2/pokedex/23/",
      "https://pokeapi.co/api/v2/pokedex/24/",
      "https://pokeapi.co/api/v2/pokedex/25/",
    ],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon",
    summary:
      "Expanded Sun and Moon with new Ultra Beasts, new areas, and the Ultra Space storyline.",
    banner: "banners/usum.jpg",
    limit: 807,
  },
  swsh: {
    title: "Sword / Shield",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/27/",
      "https://pokeapi.co/api/v2/pokedex/28/",
      "https://pokeapi.co/api/v2/pokedex/29/",
    ],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons",
    summary:
      "The first main-series Pokémon games on Nintendo Switch, introducing Dynamax, Gigantamax, and the Wild Area.",
    banner: "banners/swsh.png",
    limit: 898,
  },
  bdsp: {
    title: "Brilliant Diamond / Shining Pearl",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/5/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/brilliant-diamond-shining-pearl",
    summary:
      "Faithful Sinnoh remakes featuring updated visuals, underground exploration, and modern Pokémon mechanics.",
    banner: "banners/bdsp.jpg",
    limit: 493,
  },
  sv: {
    title: "Scarlet / Violet",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/31/",
      "https://pokeapi.co/api/v2/pokedex/32/",
      "https://pokeapi.co/api/v2/pokedex/33/",
    ],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ix/scarlet-violet",
    summary:
      "Introduced an open-world structure, three story paths, Terastalization, and rideable Legendary Pokémon.",
    banner: "banners/sv.jpg",
    limit: 1025,
  },
};

export default gameVersion;
