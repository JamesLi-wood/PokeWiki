import Dexie, { Table } from "dexie";

type Pokemon = {
  entryNumber: string;
  data: any;
};

type nationalPokedex = {
  name: string;
  entryNumber: number;
  currentTypes: [];
  pastTypes: [];
};

type regionalPokedex = {
  name: string;
  regionalDex: {
    title: string;
    entryNumbers: number[];
  }[];
};

class PokemonDB extends Dexie {
  pokemon!: Table<Pokemon>;
  nationalPokedex!: Table<nationalPokedex>;
  regionalPokedex!: Table<regionalPokedex>;

  constructor() {
    super("PokemonDB");

    this.version(1).stores({
      pokemon: "entryNumber",
      nationalPokedex: "entryNumber",
      regionalPokedex: "name",
    });
  }
}

export const db = new PokemonDB();
