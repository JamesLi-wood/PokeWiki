type NameWithURL = {
  name: string;
  url: string;
};

export type PokemonSpecies = {
  base_happiness: number;
  capture_rate: number;
  color: NameWithURL;
  egg_groups: NameWithURL[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: NameWithURL | null;
  flavor_text_entries: {
    flavor_text: string;
    language: NameWithURL;
    version: NameWithURL;
  };
  form_descriptions: {
    descripton: string;
    language: NameWithURL;
  }[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: {
    genus: string;
    language: NameWithURL;
  }[];
  generation: NameWithURL;
  growth_rate: NameWithURL;
  habitat: NameWithURL | null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: {
    language: NameWithURL;
    name: string;
  }[];
  order: number;
  pal_park_encounters: {
    area: NameWithURL;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: NameWithURL;
  }[];
  shape: NameWithURL;
  varieties: {
    is_default: boolean;
    pokemon: NameWithURL;
  }[];
};
