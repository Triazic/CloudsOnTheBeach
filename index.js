import { stickFigureDefault, stickFigureRightArmRaised } from "./skeletons.js";
import { initState } from "./state.js";
import { getMouseOverMenuEntry, onMouseDown } from "./mouseEvents.js";
import { getTopLeftPositionOfMenu } from "./menuPositioning.js";
const canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth; // this stupidity hurts
canvas.height = canvas.clientHeight; // this stupidity hurts
const ctx = canvas.getContext("2d");
const getDims = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    return { width, height };
};
const loadImage = (src) => new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        resolve(img);
    };
});
const beachImg = await loadImage("/Beach.png");
const cloudImg = await loadImage("/Cloud.png");
const soldierImg = await loadImage("/Enemy.png");
const drawImg = (img) => (x, y, w, h) => {
    ctx.drawImage(img, 0, 0, img.width, img.height, // source rectangle
    x, y, w, h // destination rectangle
    );
};
const drawBeach = drawImg(beachImg);
const drawACloud = drawImg(cloudImg);
const drawASoldier = (x, y, w, h, highlighted) => {
    const img = soldierImg;
    if (highlighted) {
        // draw the original, fully black
        ctx.filter = "brightness(0%)";
        const borderMultiplier = 1.05;
        const m = borderMultiplier;
        ctx.drawImage(img, 0, 0, img.width, img.height, // source rectangle
        x - w * (m - 1) / 2, y, w * m, h // destination rectangle
        );
        // now draw the highlight
        ctx.filter = "brightness(200%)";
        ctx.drawImage(img, 0, 0, img.width, img.height, // source rectangle
        x, y, w, h // destination rectangle
        );
        ctx.filter = "none";
    }
    else {
        ctx.drawImage(img, 0, 0, img.width, img.height, // source rectangle
        x, y, w, h // destination rectangle
        );
    }
};
const drawHeading = () => {
    ctx.fillStyle = "black";
    ctx.font = "50px verdana";
    ctx.fillText("Clouds on the Beach...", 675, 250);
};
const drawMenuText = (x, y, message) => {
    ctx.fillStyle = "white";
    ctx.font = "25px verdana";
    ctx.fillText(message, x, y);
};
const drawMenu = (contents, x, y) => {
    const borderWidth = 5;
    const heightPerRow = 30;
    const w = 140;
    const h = contents.length * heightPerRow + borderWidth * 2 + 12.5;
    // border
    ctx.fillStyle = "#6fa8de";
    ctx.fillRect(x, y, w, h);
    // interior
    ctx.fillStyle = "#1D5182";
    ctx.fillRect(x + 5, y + 5, w - 10, h - 10);
    // text
    let textY = y;
    textY += borderWidth;
    contents.forEach(({ name, highlighted }) => {
        // draw selected 'highlight'
        if (highlighted) {
            ctx.fillStyle = "#6fa8de";
            ctx.fillRect(x + 7.5, textY + 5, w - 15, heightPerRow);
        }
        textY += heightPerRow;
        drawMenuText(x + 15, textY, name);
    });
};
const drawASkeleton = (skeleton, origin, size, amHighlighted) => {
    ctx.strokeStyle = amHighlighted ? "red" : "black";
    const [ox, oy] = origin;
    skeleton.lines.forEach(line => {
        const { a: [x1, y1], b: [x2, y2] } = line;
        ctx.beginPath();
        ctx.moveTo(ox + x1 * size, oy - y1 * size);
        ctx.lineTo(ox + x2 * size, oy - y2 * size);
        ctx.stroke();
    });
    skeleton.circles.forEach(circle => {
        const { center: [x1, y1], diameter } = circle;
        const radius = size * diameter / 2;
        ctx.beginPath();
        ctx.arc(ox + x1 * size, oy - y1 * size, radius, 0, 2 * Math.PI);
        ctx.stroke();
    });
};
const drawADefaultStickFigure = (origin, amHighlighted) => drawASkeleton(stickFigureDefault, origin, 80, amHighlighted);
const drawARightArmRaisedStickFigure = (origin, amHighlighted) => drawASkeleton(stickFigureRightArmRaised, origin, 80, amHighlighted);
const render = () => {
    drawBeach(0, 0, canvas.width, canvas.height);
    const initHeight = 400;
    const spacing = 110;
    const rightUnits = state.units.filter(u => u.side == "right");
    rightUnits.forEach((unit, i) => {
        if (unit.class != "Cloud")
            throw "expecting only clouds on the right for now";
        drawACloud(1250 + spacing * i, initHeight + spacing * i, 200, 200);
    });
    const leftUnits = state.units.filter(u => u.side == "left");
    const highlightedUnit = state.units.find(u => u.id == state.menu.unitId);
    const baseSoldierX = 550;
    const baseStickManX = 615;
    const baseStickManY = 500;
    leftUnits.forEach((unit, i) => {
        if (unit.class != "StickMan" && unit.class != "Soldier")
            throw "expecting only soldiers or stick men on the left for now";
        const amHighlighted = highlightedUnit.id == unit.id;
        switch (unit.class) {
            case "StickMan":
                {
                    if (state.stickFigureArmRaised) {
                        drawARightArmRaisedStickFigure([baseStickManX - spacing * i, baseStickManY + spacing * i], amHighlighted);
                    }
                    else {
                        drawADefaultStickFigure([baseStickManX - spacing * i, baseStickManY + spacing * i], amHighlighted);
                    }
                }
                break;
            case "Soldier": {
                drawASoldier(baseSoldierX - spacing * i, initHeight + spacing * i, 200, 200, amHighlighted);
            }
            default:
                break;
        }
    });
    drawHeading();
    const { x: menuX, y: menuY } = getTopLeftPositionOfMenu(state);
    drawMenu(state.menu.contents, menuX, menuY);
    window.requestAnimationFrame(render);
};
let state = initState;
setInterval(() => state.stickFigureArmRaised = !state.stickFigureArmRaised, 1000);
canvas.addEventListener('mousemove', e => {
    const contents = state.menu.contents;
    const { x: menuX, y: menuY } = getTopLeftPositionOfMenu(state);
    const menuMouseOverEntry = getMouseOverMenuEntry(e.x, e.y, contents, menuX, menuY);
    contents.forEach(entry => entry.highlighted = false);
    if (menuMouseOverEntry) {
        contents.find(entry => entry.name == menuMouseOverEntry.name).highlighted = true; // bad code, checking on name!
    }
});
canvas.addEventListener('mousedown', e => {
    onMouseDown(e.x, e.y, state);
});
window.requestAnimationFrame(render);
