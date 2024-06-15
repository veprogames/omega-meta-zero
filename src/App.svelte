<script lang="ts">
    import { game } from "./lib/stores";
    import { saveGame, loadGame } from "./lib/game/save-load";
    import { getCurrentLayerAmount, getLayerAmount, getLayerNameHTML, getLayerOrdinal } from "./lib/layers/layers";
    import { onMount } from "svelte";
    import { D } from "./lib/decimal";
    import UiUpgrade from "./lib/upgrade/UIUpgrade.svelte";
    import { tickGame } from "./lib/game/game";
    import LayerResource from "./lib/layers/LayerResource.svelte";
    import { F } from "./lib/format";

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

    function load() {
        const loaded = loadGame();
        if (loaded) {
            game.update((g) => {
                g.loadFromObject(loaded);
                return g;
            });
        }
    }
</script>

<svelte:head>
    <title>{F($game.points)}&alpha;</title>
</svelte:head>

<main class="flex flex-col gap-8">
    <div class="text-4xl text-center">
        <LayerResource points={$game.points}/>
    </div>

    <UiUpgrade upgrade={$game.upgrades.tier1.additive}>
        <h3>Produce Alpha</h3>
    </UiUpgrade>

    <button on:click={() => ($game.points = $game.points.add(1))}>+</button>

    <button on:click={() => saveGame($game)}>save</button>

    <button on:click={load}>load</button>
</main>
