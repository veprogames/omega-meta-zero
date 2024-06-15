<script lang="ts">
    import { F } from "../format";
    import LayerResource from "../layers/LayerResource.svelte";
    import UpgradeEffect from "./UpgradeEffect.svelte";
    import type { Upgrade } from "./upgrade";

    export let upgrade: Upgrade;

    $: isFree = upgrade.currentPrice.lte(0);
</script>

<button class="text-left" on:click={() => upgrade.tryBuy()}>
    <div class="flex flex-col">
        <slot>
        
        </slot>
        <slot name="description">
    
        </slot>
    
        {#if isFree}
            <span>Free!</span>
        {:else}
            <LayerResource points={upgrade.currentPrice}/>
        {/if}

        <slot name="effect">
            <span>
                <UpgradeEffect template={upgrade.effectTemplate} effect={upgrade.currentEffect}/>

                -&gt;

                <UpgradeEffect template={upgrade.effectTemplate} effect={upgrade.nextEffect}/>
            </span>
        </slot>
    </div>
</button>