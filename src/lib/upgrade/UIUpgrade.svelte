<script lang="ts">
    import LayerResource from "../layers/LayerResource.svelte";
    import type { Upgrade } from "./upgrade";

    export let upgrade: Upgrade;
</script>

<button class="text-left" on:click={() => upgrade.tryBuy()}>
    <div class="flex flex-col">
        <slot>
        
        </slot>
        <slot name="description">
    
        </slot>
    
        <LayerResource points={upgrade.currentPrice}/>
        <span>{upgrade.formatCurrentEffect()}</span>
    </div>
</button>