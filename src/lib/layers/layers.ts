import { D } from "../decimal";

const FINF_LOG10 = Math.log10(Number.MAX_VALUE);

const LETTERS = "αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";
const HIGHER_LETTERS = "ϝϛͱϻϙͳϸ";
const HIGHER_LETTERS_2 = "☿♀♁♂♃♄♅♆♇";

/** Point at which it's useless to show the current amount */
export const MIN_BIG_LAYER = 1e6;

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

function tower(sequence: string, idx: number): string {
    if(idx < sequence.length) {
        const char = sequence[idx];
        return `<span>${char}</span>`;
    }

    const last = sequence[sequence.length - 1];

    return `${last}<sup>${tower(sequence, idx - sequence.length)}</sup>`;
}

export function getLayerNameHTML(layer: D): string {
    if(!layer.isFinite() || layer.gt("1f1e307.9")) {
        return "<|∞|>:◯";
    }

    const idx = layer.toNumber();

    const len = LETTERS.length * 5;

    // Greek Tower
    if(idx < len) {
        return tower(LETTERS, idx);
    }

    const len2 = LETTERS.length * HIGHER_LETTERS.length * 5 * 5;

    // Old Greek Tower(Greek Tower)
    if(idx < len2) {
        return `${tower(HIGHER_LETTERS, Math.floor(idx / len))}(${tower(LETTERS, idx % len)})`;
    }

    const allLen = LETTERS.length * HIGHER_LETTERS.length * HIGHER_LETTERS_2.length * 5 ** 3;

    // Planet Tower(Old Greek Tower(Greek Tower))
    if(idx < allLen) {
        return `${tower(HIGHER_LETTERS_2, Math.floor(idx / len2))}(${getLayerNameHTML(new D(idx % len2))})`;
    }

    const subTowerHeight = D.floor(layer.log(allLen));

    // Divided_Fraction
    if(subTowerHeight.lt(3)) {
        return `${getLayerNameHTML(D.floor(idx / allLen))}<sub>[${getLayerNameHTML(D.floor(idx % allLen))}]</sub>`;
    }

    const subTowerHeightTowerHeightApprox = layer.layer;

    // Divided_Fraction{Fraction Tower Height}
    if(subTowerHeightTowerHeightApprox < 5) {
        const endOfTowerLayer = D.floor(layer.div(D.pow(allLen, subTowerHeight.sub(1))));
        const uncertain = layer.gte("1ee15.55");
        return `${uncertain ? "◯" : getLayerNameHTML(endOfTowerLayer)}<sub>{${getLayerNameHTML(new D(subTowerHeight))}}</sub>`
    };

    const mag = Math.floor(layer.mag);

    // F layer:Mag
    return `<|${getLayerNameHTML(new D(subTowerHeightTowerHeightApprox))}|>:${getLayerNameHTML(new D(mag))}`;
}

export function getLayerColor(layer: D): {h: number, s: number, l: number} {
    if(!layer.isFinite()) {
        return {
            h: Math.random() * 360,
            s: 100,
            l: 100,
        };
    }
    
    let d = layer.slog();

    if(layer.gte("f15")) {
        d = d.log10();
    }

    const n = d.toNumber();

    return {
        h: (n * 180) % 360,
        s: Math.min(100, 100 * n - 20),
        l: 75 + 15 * Math.sin(0.5 * n),
    };
}

export function getLayerGlow(layer: D): {size: number} {
    if(layer.gte("f15")) {
        return {
            size: 1,
        };
    }

    const n = layer.slog().toNumber();

    return {
        size: (1 - 0.95 ** n),
    };
}