import { D } from "../decimal";
import { deepMerge } from "./save-load";

export class Game {
    points = new D(0);
    test = "awrasd";

    toJSON() {
        return {
            points: this.points
        };
    }

    loadFromObject(obj: object): void {
        deepMerge(this, obj);
    }
}