import { State } from "./state.js";

export const menuBorderWidth = 5;
export const menuBorderWidthTimes1_5 = menuBorderWidth*1.5;
export const menuWidth = 140;
export const menuItemHeight = 30;

const rootX = 685;
const rootY = 395;
const xSpacing = 110;
const ySpacing = 110;
export const getTopLeftPositionOfMenu = (state:State) => {
    const menu = state.menu;
    const unitId = menu.unitId;
    const unit = state.units.find(u => u.id == unitId);
    if (!unitId) throw `no unit found of id ${unitId}`;
    const side = unit!.side;
    if (side != "left") throw "only handled menus for units on left side for now";
    const index = state.units.findIndex(u => u.id == unitId);
    const x = rootX-index*xSpacing;
    const y = rootY+index*ySpacing;
    return {x, y};
}