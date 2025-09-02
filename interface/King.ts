export interface relicSubItem{
    title:string,
    effect:string[]
}


// 技能
interface Skill {
  CD: number;
  title: string;
  description: string;
}

// 特殊效果
interface SpecialEffect {
  mainDetails: string;
  mainDescription: string;
}

// 遺物的 Leader 效果
interface RelicLeaderEffect {
  e1: string;
  e2: string;
  e3: string;
}

// 遺物的裝備效果
interface RelicEquipEffect {
  e1: string;
  e2: string;
  e3: string;
}

// 遺物
interface Relic {
  name: string;
  image: string;
  limit: string;
  charge: string;
  subaffix: string;
  howtoget: string;
  leaderEffect: RelicLeaderEffect;
  equipEffect: RelicEquipEffect;
}

// 怪物的其他資訊
interface MonsterOthers {
  belong: string;
  rarity: string;
  howtoget: string;
  material: {
    m1: string;
    m2: string;
  };
  relic: string;
}

// 主資料結構
export interface MonsterItem {
  id: number;
  color: string;
  mainImage: string;
  hideImage: string;
  monsterTitle: string;
  monsterOthers: MonsterOthers;
  mainDescription: string;
  skill: Skill[];
  rate: number;
  specialEffect: SpecialEffect[];
  relic: Relic;
}
