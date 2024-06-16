import { D } from "../decimal";
import { FormulaUtils } from "./formula-utils";
import { Upgrade, type EffectDisplayTemplate } from "./upgrade";

const effectTemplate: EffectDisplayTemplate = {
    precise: false,
    prefix: "+",
    suffix: "/s",
    showAsResource: true,
}

export class ContentUpgrades {
    tier1 = {
        additiveCursor: new Upgrade({
            getPrice: level => level === 0 ? new D(0) : D.pow(2, level).mul(FormulaUtils.tetr(level, 10, 0.2)).mul(5),
            getEffect: level => level === 0 ? new D(0) : new D(level).mul(FormulaUtils.tetr(level, 10, 0.19)),
            effectTemplate,
        }),
        additiveGrandma: new Upgrade({
            getPrice: level => D.pow(1.9, level).mul(FormulaUtils.tetr(level, 10, 0.2)).mul(100),
            getEffect: level => level === 0 ? new D(0) : D.pow(1.45, level).mul(FormulaUtils.tetr(level, 10, 0.19)).mul(5),
            effectTemplate,
        }),
        additiveFirstDimension: new Upgrade({
            getPrice: level => D.pow(10, level).mul(FormulaUtils.tetr(level, 10, 0.2)).mul(1000),
            getEffect: level => level === 0 ? new D(0) : D.pow(4, level).mul(FormulaUtils.tetr(level, 10, 0.19)).mul(40),
            effectTemplate,
        })
    }

    getAdditivePerSecond(): D {
        return Object.values(this.tier1).map(u => u.currentEffect).reduce((e1, e2) => e1.add(e2));
    }

    toJSON() {
        return {
            tier1: this.tier1,
        };
    }
}