import { D } from "../decimal";
import { deepMerge } from "./save-load";

export class Game {
    points = new D(0);
    time = 0;

    toJSON() {
        return {
            $version: 1,
            time: this.time,
        };
    }

    loadFromObject(obj: object): void {
        deepMerge(this, obj);
    }
}