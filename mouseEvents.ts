import { menuBorderWidthTimes1_5, menuBorderWidth, menuItemHeight, menuWidth, getTopLeftPositionOfMenu } from "./menuPositioning.js";
import { State } from "./state.js";
import { MenuContents } from "./types/menuTypes.js";

export const getMouseOverMenuEntry = (mouseX:number, mouseY:number, menu:MenuContents, menuX:number, menuY:number) => {
    const getBoundsOfEntry = (i:number) => {
        const x1 = menuX+menuBorderWidthTimes1_5;
        const y1 = menuY+menuBorderWidth+i*menuItemHeight;
        const x2 = menuX+menuWidth-menuBorderWidthTimes1_5;
        const y2 = y1+menuItemHeight;
        return [x1, y1, x2, y2];
    }
    const getIfEntryMouseOvered = (i:number) => {
        const [x1, y1, x2, y2] = getBoundsOfEntry(i);
        return mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2;
    }
    return menu.find((entry,i) => getIfEntryMouseOvered(i));
}

const incrementMenuUnit = (state:State) => {
    const index = state.units.findIndex(u => u.id == state.menu.unitId);
    if (index == -1) throw "index -1?";
    const unit = state.units[index];
    if (!unit) throw "no unit?";
    if (unit.side == "right") throw "not expected unit on the right";
    let nextUnit = state.units[index+1]; // not safe
    if (nextUnit.side == "right") {
        // wrap around back to the left
        nextUnit = state.units[0];
    }
    state.menu.unitId = nextUnit.id;
}

export const onMouseDown = (mouseX:number, mouseY:number, state:State) => {
    const contents = state.menu.contents;
    const {x:menuX,y:menuY} = getTopLeftPositionOfMenu(state);
    const menuMouseOverEntry = getMouseOverMenuEntry(mouseX, mouseY, contents, menuX, menuY);
    if (menuMouseOverEntry) {
        // do the thing on the entry.. for now global
        incrementMenuUnit(state);
    }
}