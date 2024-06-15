import { D } from "./decimal";

const FINF_LOG10 = Math.log10(Number.MAX_VALUE);

const LETTERS = "αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";

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
    return points.pow(log).div(divisor);
}

export function getCurrentLayerAmount(points: D): D {
    return getLayerAmount(points, getLayerOrdinal(points));
}

export function getLayerNameHTML(layer: D): string {
    const letter = LETTERS[layer.toNumber()];
    return `<span>${letter}</span>`;
}