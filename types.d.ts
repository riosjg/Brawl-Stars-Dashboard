type Brawler = {
  avatarId: number;
  class: {
    id: number;
    name: string;
  };
  description: string;
  descriptionHtml: string;
  gadgets: Gadget[];
  hash: string;
  id: number;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  link: string;
  name: string;
  path: string;
  rarity: {
    id: number;
    name: string;
    color: string;
  };
  released: boolean;
  starPowers: StarPower[];
  stats: {
    health: {
      level: number;
      value: number;
    }[];
    attack: {
      level: number;
      value: number;
    }[];
  };
  unlock: null;
  version: number;
  videos: string[];
};

type Gadget = {
  description: string;
  descriptionHtml: string;
  id: number;
  imageUrl: string;
  name: string;
  path: string;
  released: boolean;
  version: number;
};

type StarPower = {
  description: string;
  descriptionHtml: string;
  id: number;
  imageUrl: string;
  name: string;
  path: string;
  released: boolean;
  version: number;
};
