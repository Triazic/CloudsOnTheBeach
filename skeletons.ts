export type xy = [x:number,y:number];
export type line = {a:xy,b:xy};
export type circle = {center:xy,diameter:number};
export type skeleton = {lines:line[],circles:circle[]}
 
export const stickFigureDefault:skeleton = {
    lines: [
        {a:[0,-.5], b:[0,.5]}, // main body: pelvis to shoulders
        {a:[-.5,.5], b:[.5,.5]}, // shoulders: left to right
        {a:[-1,0], b:[-.5,.5]}, // left arm
        {a:[1,0], b:[.5,.5]}, // right arm
        {a:[-.5,-1], b:[0,-0.5]}, // left leg
        {a:[.5,-1], b:[0,-0.5]}, // right leg
    ],
    circles: [
        {center:[0,0.75], diameter:0.5} // head
    ],
}