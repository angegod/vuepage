export interface funcDataItem{
    typeId:number,
    typeName: string,
    data:skillItem[]
}

export interface skillItem{
    typeId: number,
    id: number,
    name: string,
    delete?:boolean
}

export interface showSkillItem{
    tag:skillItem[],
    roundTag:skillItem[],
    comboTag:skillItem[]
}

export type TagType = 'tag' | 'roundTag' | 'comboTag';