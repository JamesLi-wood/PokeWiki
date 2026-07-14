type NameWithURL = {
  name: string;
  url: string;
};

export type PokemonData = {
  abilities: {
    ability: NameWithURL;
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string | null;
  };
  forms: NameWithURL[];
  game_indices: {
    game_index: number;
    version: NameWithURL;
  }[];
  height: number;
  held_items: {
    item: NameWithURL;
    version_details: {
      rarity: number;
      version: NameWithURL;
    }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: NameWithURL;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: NameWithURL;
      order: number | null;
      version_group: NameWithURL;
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: {
    abilities: {
      abilitiy: NameWithURL | null;
      is_hidden: boolean;
      slot: number;
    }[];
    generation: NameWithURL;
  }[];
  past_stats: {
    generation: NameWithURL;
    stats: {
      base_stat: number;
      effort: number;
      stat: NameWithURL;
    }[];
  }[];
  past_types: {
    generation: NameWithURL;
    types: {
      slot: number;
      type: NameWithURL;
    }[];
  }[];
  species: NameWithURL;
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      dream_world: {
        front_default: string;
        front_female: string | null;
      };
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    versions: {
      "generation-i": {
        "red-blue": {
          back_default: string | null;
          back_gray: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_gray: string | null;
          front_transparent: string | null;
        };
        yellow: {
          back_default: string | null;
          back_gray: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_gray: string | null;
          front_transparent: string | null;
        };
      };
      "generation-ii": {
        crystal: {
          back_default: string | null;
          back_shiny: string | null;
          back_shiny_transparent: string | null;
          back_transparent: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_shiny_transparent: string | null;
          front_transparent: string | null;
        };
        gold: {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_transparent: string | null;
        };
        silver: {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
          front_transparent: string | null;
        };
      };
      "generation-iii": {
        emerald: {
          front_default: string | null;
          front_shiny: string | null;
        };
        "firered-leafgreen": {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
        };
        "ruby-sapphire": {
          back_default: string | null;
          back_shiny: string | null;
          front_default: string | null;
          front_shiny: string | null;
        };
      };
      "generation-iv": {
        "diamond-pearl": {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        "heartgold-soulsilver": {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        platinum: {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      "generation-ix": {
        "scarlet-violet": {
          front_default: string | null;
          front_female: string | null;
        };
      };
      "generation-v": {
        "black-white": {
          animated: {
            back_default: string;
            back_female: string | null;
            back_shiny: string;
            back_shiny_female: string | null;
            front_default: string;
            front_female: string | null;
            front_shiny: string;
            front_shiny_female: string | null;
          };
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      "generation-vi": {
        "omegaruby-alphasapphire": {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        "x-y": {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      "generation-vii": {
        icons: { front_default: string; front_female: string | null };
        "ultra-sun-ultra-moon": {
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
      };
      "generation-viii": {
        "brilliant-diamond-shining-pearl": {
          front_default: string;
          front_female: string | null;
        };
        icons: { front_default: string; front_female: string | null };
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: NameWithURL;
  }[];
  types: {
    slot: number;
    type: NameWithURL;
  }[];
  weight: number;
};
