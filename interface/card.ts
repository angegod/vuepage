export interface CardItem{
    id: number,
    name: string,
    rarity: number,
    image: string,
    instantEffect: string[],
    comboEffect: string[],
    roundEffect:string[],
    PointMax: number,
    PointConsume: number,
    PointGet: number,
    fullimage: string,
    keyword: string[],
    PointEnter: number,
    spread?:CardSpread,
    tag: number[],
    comboTag:number[],
    roundTag:number[]
}

export interface CardSeriesItem{
    seriesId: number,
    seriesName: string,
    card: CardItem[]
}

interface CardSpread{
    image: string,
    index: number
}

//sortCondition
export interface SortConditionItem {
    type: string;
    sort: boolean; // true=desc, false=asc (或反過來依你的邏輯)
}

export interface CardByTextResultItem{
    time:number,
    arr:CardItem[]
}