import type { D } from "./decimal";

const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

export function F(n: D, precise: boolean = false) {
    if(n.lt(1e9)) {
        const precision = precise ? 2 : 0;
        return n.toNumber().toLocaleString("en-US", {
            minimumFractionDigits: precision,
            maximumFractionDigits: precision,
        });
    }
    
    if (n.lt(1e36)) {
        const log10 = n.log10().toNumber();
        const idx = Math.floor(log10 / 3);
        const mantissa = 10 ** (log10 % 3);
        const mLog = Math.floor(Math.log10(mantissa));

        return `${mantissa.toFixed(2 - mLog)}${suffixes[idx]}`;
    }

    return n.toExponential(2);
}