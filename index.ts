console.log("hey");

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
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
    const {width, height} = getDims();
    console.log(width, height);
    const img = new Image();
    img.src = "/Beach.png";
    img.onload = () => {
        ctx.drawImage(
            img, 0, 0, img.width,    img.height,    // source rectangle
            0, 0, canvas.width, canvas.height       // destination rectangle
        ); 
    }
}

//fillAll("green");
drawBeach();