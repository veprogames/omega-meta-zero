<script lang="ts">
    import { game } from "./lib/stores";
    import { onDestroy, onMount } from "svelte";
    import { F } from "./lib/format";
    import TabContainer from "./lib/tabs/TabContainer.svelte";
    import { D } from "./lib/decimal";

    let now = Date.now();

    let timeout: number;

    onMount(() => {
        window.dispatchEvent(new CustomEvent("game-ready"));

        mainLoop();
    });

    function tickGame(dt: number): void {
        game.update(g => {
            g.time += dt;
            
            let f2 = 3.3 * (g.time / 1200);
            const t2 = Math.max(g.time - 1800, 0);
            f2 += 2 ** (2 ** (t2 * 10 / 7200) - 1);
            const fDecimal2 = new D(`f${f2}`);
            g.points = D.pow(1.1, g.time).mul(fDecimal2).div(10).add(g.time);

            return g;
        });
    }

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

<main>
    <TabContainer/>
</main>
