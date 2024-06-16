<script lang="ts">
    import { loadGame, saveGame } from "../game/save-load";
    import { game } from "../stores";

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

<button on:click={() => saveGame($game)}>save</button>

<button on:click={load}>load</button>