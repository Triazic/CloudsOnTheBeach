"use strict";
console.log("hey");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const getDims = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    return { width, height };
};
const fillAll = (colour) => {
    const { width, height } = getDims();
    context.fillStyle = colour;
    context.fillRect(0, 0, width, height);
};
fillAll("green");
