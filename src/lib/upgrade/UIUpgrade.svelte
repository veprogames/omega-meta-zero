<script lang="ts">
    import type { Upgrade } from "./upgrade";

    export let upgrade: Upgrade;
</script>

<button on:click={() => upgrade.tryBuy()}>
    {upgrade.currentPrice}
</button>