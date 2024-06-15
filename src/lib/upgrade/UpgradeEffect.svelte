<script lang="ts">
    import type { D } from "../decimal";
    import { F } from "../format";
    import LayerResource from "../layers/LayerResource.svelte";
    import type { EffectDisplayTemplate, Upgrade } from "./upgrade";

    export let effect: D;
    export let template: EffectDisplayTemplate;

    $: p = template.prefix;
    $: s = template.suffix;
</script>

{#if template.showAsResource}
    <span>{p}<LayerResource points={effect}/>{s}</span>
{:else}
    <span>{p}{F(effect, template.precise)}{s}</span>
{/if}