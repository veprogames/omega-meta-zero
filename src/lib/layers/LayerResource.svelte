<script lang="ts">
    import type { D } from "../decimal";
    import { F } from "../format";
    import { getLayerAmount, getLayerColor, getLayerGlow, getLayerNameHTML, getLayerOrdinal } from "./layers";

    export let points: D;
    export let layer: D | null = null;

    $: currentLayer = getLayerOrdinal(points);
    $: name = getLayerNameHTML(layer ?? currentLayer);
    $: amount = getLayerAmount(points, layer ?? currentLayer);

    let color: string;

    $: {
        const {h, s, l} = getLayerColor(layer ?? currentLayer);
        color = `hsl(${h}deg, ${s}%, ${l}%)`;
    }

    let glow: string;

    $: {
        const {size} = getLayerGlow(layer ?? currentLayer);
        glow = `0 0 ${size}px currentColor, 0 0 ${size / 1.41}px currentColor, 0 0 ${size / 2}px currentColor`;
    }
</script>

<div class="inline h-fit">
    <span>{F(amount)}</span><span style:text-shadow={glow} style:color={color} class="font-bold">{@html name}</span>
</div>