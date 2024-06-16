<script lang="ts">
    import { game } from "./lib/stores";
    import { onMount } from "svelte";
    import { tickGame } from "./lib/game/game";
    import LayerResource from "./lib/layers/LayerResource.svelte";
    import { F } from "./lib/format";
    import TabContainer from "./lib/tabs/TabContainer.svelte";

    let now = Date.now();

    onMount(() => {
        mainLoop();
    });

    function mainLoop() {
        const dt = (Date.now() - now) / 1_000;
        now = Date.now();

        tickGame(dt);

        setTimeout(mainLoop, 50);
    }
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
