import Decimal from "break_eternity.js";

declare global {
    interface Decimal {
        toJSON(): any
    }
}

Decimal.prototype.toJSON = function() {
    return `D#${this.toString()}`;
}