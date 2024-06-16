<script lang="ts">
    import { D } from "../decimal";
    import { F } from "../format";
    import LayerResource from "../layers/LayerResource.svelte";
    import UpgradeEffect from "./UpgradeEffect.svelte";
    import type { Upgrade } from "./upgrade";

    export let upgrade: Upgrade;

    $: isFree = upgrade.currentPrice.lte(0);
</script>

<button class="text-left relative" disabled={!upgrade.canAfford()} on:click={() => upgrade.tryBuy()}>
    {#if isFinite(upgrade.maxLevel)}
        <span class="absolute right-4 top-2 font-bold">{F(new D(upgrade.level))} / {F(new D(upgrade.maxLevel))}</span>
    {:else}
        <span class="absolute right-4 top-2 font-bold">{F(new D(upgrade.level))}</span>
    {/if}
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
            <span class="text-sm">
                <UpgradeEffect template={upgrade.effectTemplate} effect={upgrade.currentEffect}/>

                -&gt;

                <UpgradeEffect template={upgrade.effectTemplate} effect={upgrade.nextEffect}/>
            </span>
        </slot>
    </div>
</button>