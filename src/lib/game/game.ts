import { D } from "../decimal";

export class Game {
    points = new D(0);
    test = "awrasd";

    toJSON() {
        return {
            points: this.points
        };
    }

    loadFromObject(obj: object): void {
        // not deep
        Object.assign(this, obj);
    }
}