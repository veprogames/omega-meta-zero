<script lang="ts">
    import type { D } from "../decimal";
    import { F } from "../format";
    import { getLayerAmount, getLayerNameHTML, getLayerOrdinal } from "./layers";

    export let points: D;
    export let layer: D | null = null;

    $: currentLayer = getLayerOrdinal(points);
    $: name = getLayerNameHTML(layer ?? currentLayer);
    $: amount = getLayerAmount(points, layer ?? currentLayer);
</script>

<span>{F(amount)}{@html name}</span>