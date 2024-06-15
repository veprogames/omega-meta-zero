import { D } from "../decimal";

const FINF_LOG10 = Math.log10(Number.MAX_VALUE);

const LETTERS = "αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";
const HIGHER_LETTERS = "ϝϛͱϻϙͳϸ";
const LAST = LETTERS[LETTERS.length - 1];

export function getLayerOrdinal(points: D): D {
    const abs = points.abs();

    if(abs.lt(10)) {
        return new D(0);
    }

    return D.floor(abs.log10().log(FINF_LOG10));
}

export function getLayerAmount(points: D, layer: D): D {
    if(points.lt(0)) {
        return getLayerAmount(points.mul(-1), layer);
    } else if(points.eq(0)) {
        return new D(0);
    } else if(layer.gt(Number.MAX_SAFE_INTEGER)) {
        return new D(1);
    }

    const log = D.pow(FINF_LOG10, -layer);
    const divisor = layer.gte(1) ? 10 : 1;
    return points.pow(log).div(divisor).floor();
}

export function getCurrentLayerAmount(points: D): D {
    return getLayerAmount(points, getLayerOrdinal(points));
}

export function getLayerNameHTML(layer: D): string {
    const idx = layer.toNumber();

    if(idx < LETTERS.length) {
        const letter = LETTERS[idx];
        return `<span>${letter}</span>`;
    }

    const order = Math.floor(idx / LETTERS.length);

    if(order < 5) {
        return `${LAST}<sup>${getLayerNameHTML(new D(idx - LETTERS.length))}</sup>`;
    }

    const highOrdinal = order - 5;
    const bracketIdx = LETTERS.length + idx % LETTERS.length;

    return `${HIGHER_LETTERS[highOrdinal]}(${getLayerNameHTML(new D(bracketIdx))})`;
}

export function getLayerColor(layer: D): {h: number, s: number, l: number} {
    if(layer.gte(Number.MAX_SAFE_INTEGER)) {
        return {
            h: Math.random() * 360,
            s: Math.random() * 100,
            l: Math.random() * 100,
        };
    }
    
    const n = layer.toNumber();

    return {
        h: (n * 45) % 360,
        s: Math.min(100, 40 + 10 * n),
        l: 75 + 50 * Math.sin(n),
    };
}

export function getLayerGlow(layer: D): {size: number} {
    if(layer.gte(Number.MAX_SAFE_INTEGER)) {
        return {
            size: 16,
        };
    }

    const n = layer.toNumber();

    return {
        size: 16 * (1 - 0.95 ** n),
    };
}