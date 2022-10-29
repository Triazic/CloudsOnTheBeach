console.log("hey");

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d")!;

const getDims = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    return {width, height};
}

const fillAll = (colour:string) => {
    const {width, height} = getDims();
    context.fillStyle = colour;
    context.fillRect(0, 0, width, height);
}

fillAll("green");

