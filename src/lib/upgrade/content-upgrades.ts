import { D } from "../decimal";
import { Upgrade } from "./upgrade";

export class ContentUpgrades {
    tier1 = {
        additive: new Upgrade({
            getPrice: level => level === 0 ? new D(0) : D.tetrate(2, 1 + 0.2 * level).mul(D.pow(2, level)),
            getEffect: level => D.tetrate(2, 1 + 0.19 * level).mul(D.pow(1.5, level)),
            effectTemplate: {
                precise: false,
                prefix: "+",
                suffix: "/s",
                showAsResource: true,
            }
        })
    }

    toJSON() {
        return {
            tier1: this.tier1,
        };
    }
}