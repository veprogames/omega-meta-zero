<script lang="ts">
    import type { D } from "../decimal";
    import { F } from "../format";
    import LayerResourceName from "./LayerResourceName.svelte";
    import { getLayerAmount, getLayerOrdinal, MIN_BIG_LAYER } from "./layers";

    export let points: D;
    export let layer: D | null = null;

    $: currentLayer = getLayerOrdinal(points);
    $: displayedLayer = layer ?? currentLayer;

    $: amount = getLayerAmount(points, displayedLayer);
</script>

<div class="inline-flex h-fit">
    {#if displayedLayer.lt(MIN_BIG_LAYER)}
        <span>{F(amount)}</span>
    {/if}
    <LayerResourceName layer={displayedLayer} />
</div>