export type Unit = {
    id:string;
    class: "StickMan" | "Cloud" | "Soldier";
    side: "left" | "right";
}

export type Units = Unit[];