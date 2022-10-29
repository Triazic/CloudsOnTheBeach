import { menuBorderWidthTimes1_5, menuBorderWidth, menuItemHeight, menuWidth } from "./menuPositioning.js";
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