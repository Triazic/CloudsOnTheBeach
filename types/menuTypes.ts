export type MenuEntry = {name:string, highlighted?:boolean};
export type MenuContents =  MenuEntry[];
export type Menu = {unitId:string, contents:MenuContents};