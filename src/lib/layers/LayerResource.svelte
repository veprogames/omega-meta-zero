<script lang="ts">
    import type { D } from "../decimal";
    import { F } from "../format";
    import { getLayerAmount, getLayerColor, getLayerGlow, getLayerNameHTML, getLayerOrdinal, MIN_BIG_LAYER } from "./layers";

    export let points: D;
    export let layer: D | null = null;

    $: currentLayer = getLayerOrdinal(points);
    $: name = getLayerNameHTML(layer ?? currentLayer);
    $: amount = getLayerAmount(points, layer ?? currentLayer);

    $: displayedLayer = layer ?? currentLayer;

    let color: string;

    $: {
        const {h, s, l} = getLayerColor(displayedLayer);
        color = `hsl(${h}deg, ${s}%, ${l}%)`;
    }

    let glow: string;

    $: {
        const {size} = getLayerGlow(displayedLayer);
        glow = `0 0 ${size}em currentColor, 0 0 ${size / 1.41}em currentColor, 0 0 ${size / 2}em currentColor`;
    }
</script>

<div class="inline-flex h-fit">
    {#if displayedLayer.lt(MIN_BIG_LAYER)}
        <span>{F(amount)}</span>
    {/if}
    <span style:text-shadow={glow} style:color={color} class="font-bold">{@html name}</span>
</div>