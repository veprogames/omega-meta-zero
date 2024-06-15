import { D } from "../decimal";
import { gameInstance } from "../game/game";
import { game } from "../stores";

type UpgradeFormula = (level: number) => D;

export class Upgrade {
    getPrice: UpgradeFormula;
    getEffect: UpgradeFormula;
    
    private _level = 0;
    private _currentPrice = new D(0);
    private _currentEffect = new D(0);

    constructor(getPrice: UpgradeFormula, getEffect: UpgradeFormula) {
        this.getPrice = getPrice;
        this.getEffect = getEffect;
    }

    set level(lvl: number) {
        this._level = lvl;
        this._currentPrice = this.getPrice(lvl);
        this._currentEffect = this.getEffect(lvl);
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

    get currentPoints() {
        return gameInstance().points;
    }

    get canAfford() {
        return this.currentPoints.gte(this.currentPrice);
    }

    tryBuy(): void {
        if(this.canAfford) {
            game.update(g => {
                g.points = g.points.sub(this.currentPrice);
                return g;
            });
            this.level++;
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