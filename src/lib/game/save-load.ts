import { D } from "../decimal";
import { Game } from "./game";

const KEY = "io.veprogames.omegameta.game";

export function saveGame(game: Game): void {
    const stringifed = JSON.stringify(game);
    localStorage.setItem(KEY, stringifed);
}

function reviver(this: any, key: string, value: any): any {
    if(typeof value === "string" && value.startsWith("D#")) {
        return new D(value.replace("D#", ""));
    }
    return value;
}

export function loadGame(): object | null {
    const loaded = localStorage.getItem(KEY);
    
    if(loaded === null) {
        return null;
    }

    const parsed = JSON.parse(loaded, reviver);
    
    return parsed;
}