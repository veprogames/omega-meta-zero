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

export function deepMerge(target: any, source: any) {
    for(const k in target) {
        if(!(k in source)) {
            continue;
        }

        if(typeof target[k] === "object" && typeof source[k] === "object") {
            deepMerge(target[k], source[k]);
        } else if(typeof target[k] === "object" && "loadFromObject" in target[k]) {
            target[k].loadFromObject(source[k]);
        } else {
            target[k] = source[k];
        }
    }
}