<script lang="ts">
    import { game } from "./lib/stores";
    import { saveGame, loadGame } from "./lib/game/save-load";
    import { getCurrentLayerAmount, getLayerAmount, getLayerNameHTML, getLayerOrdinal } from "./lib/layers";
    import { onMount } from "svelte";
    import { D } from "./lib/decimal";
    import UiUpgrade from "./lib/upgrade/UIUpgrade.svelte";
    import { tickGame } from "./lib/game/game";

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

<main class="bg-slate-900 text-green-400 h-screen p-8">
    {$game.points}<br/>({getLayerOrdinal($game.points)})<br/>({getCurrentLayerAmount($game.points)})

    <p>You have {getCurrentLayerAmount($game.points)}{@html getLayerNameHTML(getLayerOrdinal($game.points))}</p>

    <UiUpgrade upgrade={$game.upgrades.tier1.additive}/>

    <button on:click={() => ($game.points = $game.points.add(1))}>+</button>

    <button on:click={() => saveGame($game)}>save</button>

    <button on:click={load}>load</button>
</main>
