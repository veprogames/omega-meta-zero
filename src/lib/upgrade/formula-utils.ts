import { D } from "../decimal";

export class FormulaUtils {
    static tetr(level: number, fromLevel: number, strength: number): D {
        if(level - fromLevel <= 0) {
            return new D(1);
        }
        return D.tetrate(2, strength * (level - fromLevel));
    }
}