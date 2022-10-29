export type MenuEntry = {name:string, highlighted?:boolean};
export type MenuContents = MenuEntry[];

export const soldierMenuContents:MenuContents = [
    {name:"Retreat"},
    {name:"Submit"},
    {name:"Give Up"},
    {name:"Despair", highlighted:true},
    {name:"Flee"},
    {name:"Bargain"},
]