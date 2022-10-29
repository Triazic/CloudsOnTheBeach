console.log("hey");

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

const drawBeach = () => {
    const img = new Image();
    img.src = "/Beach.png";
    img.onload = () => {
        ctx.drawImage(
            img, 0, 0, img.width,    img.height,    // source rectangle
            0, 0, canvas.width, canvas.height       // destination rectangle
        ); 
    }
}

const drawACloud = (x:number, y:number, w?:number, h?:number) => {
    const img = new Image();
    img.src = "/Cloud.png";
    img.onload = () => {
        ctx.drawImage(
            img, 0, 0, img.width,    img.height,    // source rectangle
            x, y, w ?? 130, h ?? 130       // destination rectangle
        ); 
    }
}

//fillAll("green");
drawBeach();
drawACloud(1250, 475);
const spacing = 110;
drawACloud(1250+spacing, 475+spacing);
drawACloud(1250+spacing*2, 475+spacing*2);