<script lang="ts">
    import { fade, scale } from "svelte/transition";
    import { D } from "../decimal";
    import { F } from "../format";
    import LayerResource from "../layers/LayerResource.svelte";
    import { MIN_BIG_LAYER } from "../layers/layers";
    import { game } from "../stores";

    $: isBig = $game.getCurrentLayer().gte(MIN_BIG_LAYER);
    $: showInfo = $game.getCurrentLayer().gte(1) || $game.infinities > 0;
</script>

<div class="flex flex-col justify-center items-stretch h-screen text-center w-full px-8">
    <div class="flex justify-center items-center min-h-72"
        class:justify-center={!isBig}
        class:justify-left={isBig}
        class:size-m={!isBig}
        class:size-s={isBig}>
        <LayerResource points={$game.points}/>
    </div>
    {#if showInfo}
        <div class="flex flex-wrap justify-around gap-8 pt-16" in:fade={{duration: 3000}}>
            <p>You are on Layer <span class="font-bold text-blue-300">{F($game.getCurrentLayer().add(1))}</span></p>
            <div>That is also: <LayerResource layer={new D(0)} points={$game.points}/></div>
            {#if $game.infinities > 0}
                <p>You have <span class="font-bold text-blue-300">{F(new D($game.infinities))}</span> True {$game.infinities !== 1 ? "Infinities" : "infinity"}</p>
            {/if}
        </div>
    {/if}
</div>

<style lang="postcss">
    .size-m {
        @apply text-4xl md:text-6xl lg:text-8xl;
    }

    .size-s {
        @apply text-2xl md:text-4xl lg:text-5xl;
    }
</style>