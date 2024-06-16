<script lang="ts">
    import { game } from "./lib/stores";
    import { onDestroy, onMount } from "svelte";
    import { tickGame } from "./lib/game/game";
    import LayerResource from "./lib/layers/LayerResource.svelte";
    import { F } from "./lib/format";
    import TabContainer from "./lib/tabs/TabContainer.svelte";

    let now = Date.now();

    let timeout: number;

    onMount(() => {
        window.dispatchEvent(new CustomEvent("game-ready"));

        mainLoop();
    });

    function mainLoop() {
        const dt = (Date.now() - now) / 1_000;
        now = Date.now();

        tickGame(dt);

        timeout = setTimeout(mainLoop, 50);
    }

    onDestroy(() => {
        if(timeout) {
            clearTimeout(timeout);
        }
    });    
</script>

<svelte:head>
    <title>{F($game.points)}&alpha;</title>
</svelte:head>

<main class="flex flex-col gap-8">
    <div class="text-4xl text-center lg:text-6xl">
        <LayerResource points={$game.points}/>
    </div>

    <TabContainer/>
</main>
