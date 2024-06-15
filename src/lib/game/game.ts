import { get } from "svelte/store";
import { D } from "../decimal";
import { deepMerge } from "./save-load";
import { game } from "./../stores"
import { ContentUpgrades } from "../upgrade/content-upgrades";

export class Game {
    points = new D(0);
    upgrades = new ContentUpgrades();

    toJSON() {
        return {
            $version: 1,
            points: this.points,
            upgrades: this.upgrades,
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
        const perSecond = g.upgrades.tier1.additive.currentEffect;
        g.points = g.points.add(perSecond.mul(dt));

        return g;
    });
}