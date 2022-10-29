import { MenuContents } from "./menuTypes";

export const soldierMenuContents = [
    { name: "Retreat" },
    { name: "Submit" },
    { name: "Give Up" },
    { name: "Despair", highlighted: true },
    { name: "Flee" },
    { name: "Bargain" },
];

export const initState = {
    stickFigureArmRaised: false as boolean,
    menuContents: soldierMenuContents as MenuContents,
}

export type State = typeof initState;