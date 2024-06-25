import { get } from "svelte/store";
import { D } from "../decimal";
import { deepMerge } from "./save-load";
import { game } from "./../stores";

export class Game {
    points = new D(0);

    toJSON() {
        return {
            $version: 1,
            points: this.points
        };
    }

    loadFromObject(obj: object): void {
        deepMerge(this, obj);
    }
}

export function gameInstance(): Game {
    return get(game);
}

export function tickGame(dt: number): void {
    game.update(g => {
        g.points = g.points
            .add(dt)
            .mul(1.1 ** dt)
            .pow(1.01 ** dt);

        return g;
    });
}