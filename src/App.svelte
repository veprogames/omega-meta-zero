<script lang="ts">
    import { game } from "./lib/stores";
    import { onDestroy, onMount } from "svelte";
    import { F } from "./lib/format";
    import TabContainer from "./lib/tabs/TabContainer.svelte";
    import { D } from "./lib/decimal";
    import { loadGame, saveGame } from "./lib/game/save-load";

    let now = Date.now();

    let timeout: number;
    let saveInterval: number;

    onMount(() => {
        window.dispatchEvent(new CustomEvent("game-ready"));

        try {
            load();
        } catch(err: unknown) {
            alert(`Something went wrong while loading the game :pensive: ${err}`);
        }

        mainLoop();

        saveInterval = setInterval(() => saveGame($game), 30_000);
    });

    function load() {
        const loaded = loadGame();
        if (loaded) {
            game.update((g) => {
                g.loadFromObject(loaded);
                return g;
            });
        }
    }

    function tickGame(dt: number): void {
        game.update(g => {
            g.time += dt;

            const effectiveTime = g.time * (g.infinities + 1);
            
            let f2 = 3.3 * (effectiveTime / 1200);
            const t2 = Math.max(effectiveTime - 1800, 0);
            f2 += 2 ** (2 ** (t2 * 10 / 7200) - 1);
            const fDecimal2 = isFinite(f2) ? new D(`f${f2}`) : D.dInf;
            g.points = D.pow(1.1, effectiveTime).mul(fDecimal2).div(10).add(effectiveTime);

            if(!g.points.isFinite()) {
                g.time = 0;
                g.infinities += 1;
            }

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

        if(saveInterval) {
            clearInterval(saveInterval);
        }
    });    
</script>

<svelte:head>
    <meta name="keywords" content="idle, incremental, zero player, omega, layers, vepro, veprogames"/>
    <meta name="description" content="An Incremental Game where you just watch a number grow to absurdity. Zero Player!"/>
    <meta name="url" content="https://veprogames.github.io/omega-meta-zero/"/>
    <meta name="image" content="https://veprogames.github.io/omega-meta-zero/icon512x.png"/>
    <meta name="theme-color" content="#eba000"/>

    <meta name="og:title" content="omega-meta-zero"/>
    <meta name="og:type" content="website"/>
    <meta name="og:description" content="An Incremental Game where you just watch a number grow to absurdity. Zero Player!"/>
    <meta name="og:url" content="https://veprogames.github.io/omega-meta-zero/"/>
    <meta name="og:image" content="https://veprogames.github.io/omega-meta-zero/icon512x.png"/>

    <meta name="twitter:card" content="summary_image_large"/>
    <meta name="twitter:title" content="omega-meta-zero"/>
    <meta name="twitter:description" content="An Incremental Game where you just watch a number grow to absurdity. Zero Player!"/>
    <meta name="twitter:image" content="https://veprogames.github.io/omega-meta-zero/icon512x.png"/>

    <link rel="icon" href="./favicon.ico" />

    <title>{F($game.points)}&alpha;</title>
</svelte:head>

<main>
    <TabContainer/>
</main>
