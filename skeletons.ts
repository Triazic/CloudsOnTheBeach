export type xy = [x:number,y:number];
export type line = {a:xy,b:xy};
export type circle = {center:xy,diameter:number};
export type skeleton = {lines:line[],circles:circle[]}
 
export const stickFigureDefault:skeleton = {
    lines: [
        {a:[0,-.4], b:[0,.5]}, // main body: pelvis to shoulders
        {a:[-.4,.4], b:[.4,.4]}, // shoulders: left to right
        {a:[-.6,-.1], b:[-.4,.4]}, // left arm
        {a:[.6,-.1], b:[.4,.4]}, // right arm
        {a:[-.5,-1], b:[0,-0.4]}, // left leg
        {a:[.5,-1], b:[0,-0.4]}, // right leg
    ],
    circles: [
        {center:[0,0.75], diameter:0.5} // head
    ],
}