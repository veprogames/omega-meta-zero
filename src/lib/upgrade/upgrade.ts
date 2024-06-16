import { D } from "../decimal";
import { F } from "../format";
import { gameInstance } from "../game/game";
import { game } from "../stores";

type UpgradeFormula = (level: number) => D;

const DEFAULT_EFFECT_TEMPLATE: EffectDisplayTemplate = {
    prefix: "x",
    suffix: "",
    precise: true,
    showAsResource: false,
}

export interface UpgradeConfig {
    getPrice: UpgradeFormula,
    getEffect: UpgradeFormula,
    maxLevel?: number,
    effectTemplate?: EffectDisplayTemplate,
}

export class Upgrade {
    getPrice: UpgradeFormula;
    getEffect: UpgradeFormula;
    maxLevel: number;

    effectTemplate: EffectDisplayTemplate;
    
    private _level = 0;
    private _currentPrice = new D(0);
    private _currentEffect = new D(0);
    private _nextEffect = new D(0);

    constructor({getPrice, getEffect, maxLevel, effectTemplate}: UpgradeConfig) {
        this.getPrice = getPrice;
        this.getEffect = getEffect;
        this.maxLevel = maxLevel ?? Infinity;
        this.effectTemplate = effectTemplate ?? DEFAULT_EFFECT_TEMPLATE;

        this.recalculate();

        window.addEventListener("upgrade-bought", () => this.recalculate());
    }

    private recalculate() {
        this._currentPrice = this.getPrice(this.level);
        this._currentEffect = this.getEffect(this.level);
        this._nextEffect = this.getEffect(this.level + 1);
    }

    set level(lvl: number) {
        this._level = lvl;
        this.recalculate();
    }

    get level() {
        return this._level;
    }

    get currentPrice() {
        return this._currentPrice;
    }

    get currentEffect() {
        return this._currentEffect;
    }

    get nextEffect() {
        return this._nextEffect;
    }

    private get currentPoints() {
        return gameInstance().points;
    }

    canAfford() {
        return this.currentPoints.gte(this.currentPrice);
    }

    isMaxed() {
        return this.level >= this.maxLevel;
    }

    formatCurrentEffect(): string {
        return `${this.effectTemplate.prefix}${F(this.currentEffect, this.effectTemplate.precise)}${this.effectTemplate.suffix}`;
    }

    tryBuy(): void {
        if(this.canAfford() && !this.isMaxed()) {
            game.update(g => {
                g.points = g.points.sub(this.currentPrice);
                return g;
            });
            this.level++;
            window.dispatchEvent(new CustomEvent("upgrade-bought"));
        }
    }

    loadFromObject(obj: any) {
        console.log(obj);
        
        this.level = obj.level ?? 0;
    }

    toJSON() {
        return {
            level: this.level
        };
    }
}

export interface EffectDisplayTemplate {
    prefix: string,
    suffix: string,
    precise: boolean,
    showAsResource: boolean,
}