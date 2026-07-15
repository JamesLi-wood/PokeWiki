type NameWithURL = {
  name: string;
  url: string;
};

type EvolutionDetails = {
  base_form: NameWithURL | null; // Might not use
  evolved_form: NameWithURL | null; // Might not use
  gender: number | null;
  held_item: NameWithURL | null;
  is_default: boolean;
  item: NameWithURL;
  known_move: NameWithURL | null;
  known_move_type: NameWithURL | null;
  location: NameWithURL | null; // Might not use
  min_affection: number | null; // Might not use
  min_beauty: number | null; // Might not use
  min_damage_taken: number | null;
  min_happiness: number | null;
  min_level: number;
  min_move_count: number | null;
  min_steps: number | null;
  near_special_rock: boolean; // Might not use
  needs_multiplayer: boolean;
  needs_overworld_rain: boolean;
  party_species: NameWithURL | null;
  party_type: NameWithURL | null;
  region: NameWithURL | null; // Might not use
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NameWithURL | null;
  trigger: NameWithURL;
  turn_upside_down: boolean;
  used_moved: NameWithURL | null;
  version_group: NameWithURL;
};

export type Chain = {
  evolution_details: EvolutionDetails[];
  evolves_to: Chain[];
  is_baby: boolean;
  species: NameWithURL;
};

export type EvolutionChain = {
  baby_trigger_item: {
    name: string;
    url: string;
  } | null;
  chain: Chain;
  id: number;
};
