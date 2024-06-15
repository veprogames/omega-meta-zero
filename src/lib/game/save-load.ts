import { D } from "../decimal";
import { Game } from "./game";

const KEY = "io.veprogames.omegameta.game";

export function saveGame(game: Game): void {
    const stringifed = JSON.stringify(game);
    const encoded = btoa(stringifed);
    localStorage.setItem(KEY, encoded);
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

    const decoded = atob(loaded);

    const parsed = JSON.parse(decoded, reviver);
    
    return parsed;
}

export function deepMerge(target: any, source: any) {
    for(const k in target) {
        if(!(k in source)) {
            continue;
        }

        if(typeof target[k] === "object" && typeof source[k] === "object") {
            if("loadFromObject" in target[k]) {
                target[k].loadFromObject(source[k]);
            } else {
                deepMerge(target[k], source[k]);
            }
        } else {
            target[k] = source[k];
        }
    }
}