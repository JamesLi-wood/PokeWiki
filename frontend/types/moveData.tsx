type NameWithURL = {
  name: string;
  url: string;
};

export type MoveData = {
  accuracy: number | null;
  contest_combos: {
    normal: {
      use_after: NameWithURL[] | null;
      use_before: NameWithURL[] | null;
    };
    super: {
      use_after: NameWithURL[] | null;
      use_before: NameWithURL[] | null;
    };
  } | null;
  contest_effect: {
    url: string;
  } | null;
  contest_type: NameWithURL | null;
  damage_class: NameWithURL;
  effect_chance: number | null;
  effect_changes: {
    effect_entries: {
      effect: string;
      language: NameWithURL;
    }[];
    version_group: NameWithURL;
  }[];
  effect_entries: {
    effect: string;
    language: NameWithURL;
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NameWithURL;
    version_group: NameWithURL;
  }[];
  generation: NameWithURL;
  id: number;
  learned_by_pokemon: NameWithURL[];
  machines: {
    machine: { url: string };
    version_group: NameWithURL;
  }[];
  meta: {
    ailment: NameWithURL;
    ailment_chance: number;
    category: NameWithURL;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: number | null;
    max_turns: number | null;
    min_hits: number | null;
    min_turns: number | null;
    stat_chance: number;
  };
  name: string;
  names: {
    language: NameWithURL;
    name: string;
  }[];
  past_values: {
    accuracy: number | null;
    effect_chance: number | null;
    effect_entries: {
      effect: string;
      language: NameWithURL;
      short_effect: string;
    }[];
    power: number | null;
    pp: number | null;
    type: NameWithURL | null;
    version_group: NameWithURL;
  }[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: {
    change: number;
    stat: NameWithURL;
  }[];
  super_contest_effect: { url: string } | null;
  target: NameWithURL;
  type: NameWithURL;
};
