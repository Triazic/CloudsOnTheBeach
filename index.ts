import {skeleton, stickFigureDefault, stickFigureRightArmRaised, xy} from "./skeletons.js"
import {initState, State} from "./state.js"
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = canvas.clientWidth; // this stupidity hurts
canvas.height = canvas.clientHeight; // this stupidity hurts
const ctx = canvas.getContext("2d")!;

const getDims = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    return {width, height};
}

const fillAll = (colour:string) => {
    const {width, height} = getDims();
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, width, height);
}

const loadImage = (src:string) => new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        resolve(img);
    }
});

const beachImg = await loadImage("/Beach.png");
const cloudImg = await loadImage("/Cloud.png");
const soldierImg = await loadImage("/Enemy.png");

const drawImg = (img:HTMLImageElement) => (x:number, y:number, w:number, h:number) => {
    ctx.drawImage(
        img, 0, 0, img.width, img.height,    // source rectangle
        x, y, w, h       // destination rectangle
    ); 
}
const drawBeach = drawImg(beachImg);
const drawACloud = drawImg(cloudImg);
const drawASoldier = drawImg(soldierImg);

const drawHeading = () => {
    ctx.fillStyle = "black";
    ctx.font = "50px verdana";
    ctx.fillText("Clouds on the Beach...", 675, 250);
}

const drawMenuText = (x:number, y:number, message:string) => {
    ctx.fillStyle = "white";
    ctx.font = "25px verdana";
    ctx.fillText(message, x, y);
}

const drawMenu = () => {
    const x = 450;
    const y = 605;
    const w = 140;
    const h = w * 1.62-20;
    // border
    ctx.fillStyle = "#6fa8de";
    ctx.fillRect(x, y, w, h);
    // interior
    ctx.fillStyle = "#1D5182";
    ctx.fillRect(x+5, y+5, w-10, h-10);
    // text
    let textY = y;
    textY += 5;
    textY += 30;
    drawMenuText(x+15, textY, "Retreat");
    textY += 30;
    drawMenuText(x+15, textY, "Submit");
    textY += 30;
    drawMenuText(x+15, textY, "Give Up");
    // draw selected 'highlight'
    {
        ctx.fillStyle = "#6fa8de";
        ctx.fillRect(x+7.5, textY+5, w-15, 30);
    }
    textY += 30;
    drawMenuText(x+15, textY, "Despair");
    textY += 30;
    drawMenuText(x+15, textY, "Flee");
    textY += 30;
    drawMenuText(x+15, textY, "Bargain");
}

const drawASkeleton = (skeleton:skeleton, origin:xy, size:number) => {
    ctx.fillStyle = "black";
    const [ox,oy] = origin;
    skeleton.lines.forEach(line => {
        const {a:[x1,y1], b:[x2,y2]} = line;
        ctx.beginPath();
        ctx.moveTo(ox+x1*size, oy-y1*size);
        ctx.lineTo(ox+x2*size, oy-y2*size);
        ctx.stroke();
    });
    skeleton.circles.forEach(circle => {
        const {center:[x1,y1], diameter} = circle;
        const radius = size*diameter/2;
        ctx.beginPath();
        ctx.arc(ox+x1*size, oy-y1*size, radius, 0, 2 * Math.PI);
        ctx.stroke();
    });
}

const drawADefaultStickFigure = (origin:xy) => drawASkeleton(stickFigureDefault, origin, 80);
const drawARightArmRaisedStickFigure = (origin:xy) => drawASkeleton(stickFigureRightArmRaised, origin, 80);

const render = () => {
    drawBeach(0, 0, canvas.width, canvas.height);
    const initHeight = 400;
    drawACloud(1250, initHeight, 200, 200);
    const spacing = 110;
    drawACloud(1250+spacing, initHeight+spacing, 200, 200);
    drawACloud(1250+spacing*2, initHeight+spacing*2, 200, 200);
    const baseSoldierX = 550;

    if (state.stickFigureArmRaised) {
        drawARightArmRaisedStickFigure([baseSoldierX+spacing/2+8, initHeight+spacing/2+8]);
    }
    else {
        drawADefaultStickFigure([baseSoldierX+spacing/2+8, initHeight+spacing/2+8]);
    }
    drawASoldier(baseSoldierX-spacing, initHeight+spacing, 200, 200);
    drawASoldier(baseSoldierX-spacing*2, initHeight+spacing*2, 200, 200);
    drawHeading();
    drawMenu();

    window.requestAnimationFrame(render);
}

let state = initState;
setInterval(() => state.stickFigureArmRaised = !state.stickFigureArmRaised, 1000);
window.requestAnimationFrame(render);

export {}