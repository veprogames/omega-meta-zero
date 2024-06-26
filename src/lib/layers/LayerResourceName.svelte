<script lang="ts">
    import type { D } from "../decimal";
    import { getLayerColor, getLayerGlow, getLayerNameHTML } from "./layers";

    export let layer: D;

    $: name = getLayerNameHTML(layer);

    let color: string;

    $: {
        const {h, s, l} = getLayerColor(layer);
        color = `hsl(${h}deg, ${s}%, ${l}%)`;
    }

    let glow: string;

    $: {
        const {size} = getLayerGlow(layer);
        glow = `0 0 ${size}em currentColor, 0 0 ${size / 1.41}em currentColor, 0 0 ${size / 2}em currentColor`;
    }
</script>

<span style:text-shadow={glow} style:color={color} class="font-bold">{@html name}</span>