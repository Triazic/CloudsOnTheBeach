import { Menu, MenuContents } from "./types/menuTypes";
import { Units } from "./types/unitTypes";

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
    menu: {unitId:"Soldier3", contents: soldierMenuContents} as Menu,
    units: [
        { id:"StickMan1", side:"left", class:"StickMan"},
        { id:"Soldier2", side:"left", class:"Soldier"},
        { id:"Soldier3", side:"left", class:"Soldier"},
        { id:"Cloud1", side:"right", class:"Cloud"},
        { id:"Cloud2", side:"right", class:"Cloud"},
        { id:"Cloud3", side:"right", class:"Cloud"},
    ] as Units,
}

export type State = typeof initState;