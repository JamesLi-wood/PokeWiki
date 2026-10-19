const gameVersion = {
  rb: {
    title: "Red / Blue",
    summary:
      "The original Pokémon games that introduced the first 151 Pokémon and started the global Pokémon phenomenon.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/2/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/transparent",
    animatedSprite: null,
    animatedFileType: null,
    banner: "banners/rb.jpg",
    limit: 151,
  },
  yellow: {
    title: "Yellow",
    summary:
      "Inspired by the anime, Yellow made Pikachu your starter and added Jessie, James, and Meowth.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/2/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/transparent",
    animatedSprite: null,
    animatedFileType: null,
    banner: "banners/yellow.jpg",
    limit: 151,
  },
  gs: {
    title: "Gold / Silver",
    summary:
      "Introduced 100 new Pokémon, breeding, held items, day/night cycles, and the ability to revisit Kanto.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/3/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/silver/transparent",
    animatedSprite: null,
    animatedFileType: null,
    banner: "banners/gs.jpg",
    limit: 251,
  },
  crystal: {
    title: "Crystal",
    summary:
      "The first Pokémon game with animated Pokémon sprites and the first to let players choose a female character.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/3/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent",
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/animated",
    animatedFileType: "gif",
    banner: "banners/crystal.jpg",
    limit: 251,
  },
  rs: {
    title: "Ruby / Sapphire",
    summary:
      "The first Pokémon games on the Game Boy Advance, introducing Abilities, Double Battles, and Pokémon Contests.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/4/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/ruby-sapphire",
    animatedSprite: null,
    animatedFileType: null,
    banner: "banners/rs.jpg",
    limit: 386,
  },
  frlg: {
    title: "Firered / Leafgreen",
    summary:
      "Remade the original Kanto games with updated graphics, mechanics, and connectivity for the Game Boy Advance.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/2/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen",
    animatedSprite: null,
    animatedFileType: null,
    banner: "banners/frlg.png",
    limit: 386,
  },
  emerald: {
    title: "Emerald",
    summary:
      "Expanded Hoenn with the Battle Frontier and centered its legendary storyline around Rayquaza.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/4/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald",
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/animated",
    animatedFileType: "png",
    banner: "banners/emerald.jpg",
    limit: 386,
  },
  dp: {
    title: "Diamond / Pearl",
    summary:
      "The first main-series Pokémon games on Nintendo DS, introducing online trading and battling through Nintendo Wi-Fi.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/5/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl",
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/diamond-pearl/animated",
    animatedFileType: "png",
    banner: "banners/dp.jpg",
    limit: 493,
  },
  platinum: {
    title: "Platinum",
    summary:
      "Expanded Sinnoh with the Distortion World, new forms, and an enhanced storyline centered around Giratina.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/6/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum",
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/platinum/animated",
    animatedFileType: "png",
    banner: "banners/platinum.png",
    limit: 493,
  },
  hgss: {
    title: "Heartgold / Soulsilver",
    summary:
      "DS remakes of Gold and Silver featuring Pokémon following you and returning adventures across Johto and Kanto.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/7/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver",
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/animated",
    animatedFileType: "png",
    banner: "banners/hgss.png",
    limit: 493,
  },
  bw: {
    title: "Black / White",
    summary:
      "Introduced 156 new Pokémon and initially restricted the Pokédex to entirely new species.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/8/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white",
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated",
    animatedFileType: "gif",
    banner: "banners/bw.png",
    limit: 649,
  },
  bw2: {
    title: "Black 2 / White 2",
    summary:
      "The first direct Pokémon sequels, continuing Black and White's story two years later.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/9/"],
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white",
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated",
    animatedFileType: "gif",
    banner: "banners/bw2.jpg",
    limit: 649,
  },
  xy: {
    title: "X / Y",
    summary:
      "The first main-series Pokémon games with fully 3D environments and character models, introducing Mega Evolution.",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/12/",
      "https://pokeapi.co/api/v2/pokedex/13/",
      "https://pokeapi.co/api/v2/pokedex/14/",
    ],
    sprite: null,
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon",
    animatedFileType: "gif",
    banner: "banners/xy.jpg",
    limit: 721,
  },
  oras: {
    title: "Omegaruby / Alphasapphire",
    summary:
      "Hoenn remakes featuring Mega Evolution, Primal Reversion, and expanded post-game content.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/15/"],
    sprite: null,
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon",
    animatedFileType: "gif",
    banner: "banners/oras.png",
    limit: 721,
  },
  sm: {
    title: "Sun / Moon",
    summary:
      "Replaced traditional Gyms with Island Challenges and introduced regional forms, Z-Moves, and Ultra Beasts.",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/17/",
      "https://pokeapi.co/api/v2/pokedex/18/",
      "https://pokeapi.co/api/v2/pokedex/19/",
      "https://pokeapi.co/api/v2/pokedex/20/",
    ],
    sprite: null,
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon",
    animatedFileType: "gif",
    banner: "banners/sm.jpg",
    limit: 802,
  },
  usum: {
    title: "Ultra Sun / Ultra Moon",
    summary:
      "Expanded Sun and Moon with new Ultra Beasts, new areas, and the Ultra Space storyline.",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/22/",
      "https://pokeapi.co/api/v2/pokedex/23/",
      "https://pokeapi.co/api/v2/pokedex/24/",
      "https://pokeapi.co/api/v2/pokedex/25/",
    ],
    sprite: null,
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon",
    animatedFileType: "gif",
    banner: "banners/usum.jpg",
    limit: 807,
  },
  lgpe: {
    title: "Let's Go Pikachu / Let's Go Eevee",
    summary:
      "First main-series games built around Pokémon GO-inspired catching, returning to Kanto with partner Pikachu or Eevee.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/2/"],
    sprite: null,
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/lets-go-pikachu-lets-go-eevee",
    animatedFileType: "gif",
    banner: "banners/lgpe.jpg",
    limit: 151,
  },
  swsh: {
    title: "Sword / Shield",
    summary:
      "The first main-series Pokémon games on Nintendo Switch, introducing Dynamax, Gigantamax, and the Wild Area.",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/27/",
      "https://pokeapi.co/api/v2/pokedex/28/",
      "https://pokeapi.co/api/v2/pokedex/29/",
    ],
    sprite: null,
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/sword-shield",
    animatedFileType: "webp",
    banner: "banners/swsh.png",
    limit: 898,
  },
  bdsp: {
    title: "Brilliant Diamond / Shining Pearl",
    summary:
      "Faithful Sinnoh remakes featuring updated visuals, underground exploration, and modern Pokémon mechanics.",
    regionalDex: ["https://pokeapi.co/api/v2/pokedex/5/"],
    sprite: null,
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/brilliant-diamond-shining-pearl",
    animatedFileType: "webp",
    banner: "banners/bdsp.jpg",
    limit: 493,
  },
  sv: {
    title: "Scarlet / Violet",
    summary:
      "Introduced an open-world structure, three story paths, Terastalization, and rideable Legendary Pokémon.",
    regionalDex: [
      "https://pokeapi.co/api/v2/pokedex/31/",
      "https://pokeapi.co/api/v2/pokedex/32/",
      "https://pokeapi.co/api/v2/pokedex/33/",
    ],
    sprite: null,
    animatedSprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ix/scarlet-violet",
    animatedFileType: "webp",
    banner: "banners/sv.jpg",
    limit: 1025,
  },
};

export default gameVersion;
