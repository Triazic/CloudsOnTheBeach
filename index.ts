import {skeleton, stickFigureDefault, stickFigureRightArmRaised, xy} from "./skeletons.js"
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

const drawBeach = () => new Promise((resolve) => {
    const img = new Image();
    img.src = "/Beach.png";
    img.onload = () => {
        ctx.drawImage(
            img, 0, 0, img.width,    img.height,    // source rectangle
            0, 0, canvas.width, canvas.height       // destination rectangle
        ); 
    }
});

const drawACloud = (x:number, y:number, w?:number, h?:number) => new Promise((resolve) => {
    const img = new Image();
    img.src = "/Cloud.png";
    img.onload = () => {
        ctx.drawImage(
            img, 0, 0, img.width,    img.height,    // source rectangle
            x, y, w ?? 200, h ?? 200       // destination rectangle
        );
        resolve(null);
    }
});

const drawASoldier = (x:number, y:number, w?:number, h?:number) => new Promise((resolve) => {
    const img = new Image();
    img.src = "/Enemy.png";
    img.onload = () => {
        ctx.drawImage(
            img, 0, 0, img.width,    img.height,    // source rectangle
            x, y, w ?? 200, h ?? 200       // destination rectangle
        );
        resolve(null);
    }
});

const drawHeading = () => {
    ctx.fillStyle = "black";
    ctx.font = "50px verdana";
    ctx.fillText("Clouds on the Beach...", 675, 250);
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

//fillAll("green");
drawBeach();
const initHeight = 400;
await drawACloud(1250, initHeight);
const spacing = 110;
await drawACloud(1250+spacing, initHeight+spacing);
await drawACloud(1250+spacing*2, initHeight+spacing*2);
const baseSoldierX = 550;
//await drawASoldier(baseSoldierX, initHeight);
{
    // draw a pseudo-waving stick figure
    setInterval(() => {
        n++;
        const even = n % 2 === 0;
        if (even) {
            drawARightArmRaisedStickFigure([baseSoldierX+spacing/2+8, initHeight+spacing/2+8]);
        }
        else {
            drawADefaultStickFigure([baseSoldierX+spacing/2+8, initHeight+spacing/2+8]);
        }
    }, 1000)
}
let n = 0;

await drawASoldier(baseSoldierX-spacing, initHeight+spacing);
await drawASoldier(baseSoldierX-spacing*2, initHeight+spacing*2);
drawHeading();

export {}