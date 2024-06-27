<script lang="ts">
    import { D } from "../decimal";
    import { F } from "../format";
    import LayerResourceName from "../layers/LayerResourceName.svelte";
    import { game } from "../stores";

    const PER_PAGE = 10;

    let start = "1";
    let page = 0;
    let stepLinear = 1;
    let stepMult = 1;

    let spoilers = false;
    let fMode = false;

    $: layers = Array.from({length: 10}, (_, i) => {
        const idx = i + page * PER_PAGE;

        if(fMode) {
            const f = parseFloat(start) - 2 + stepLinear * idx + stepMult ** idx;
            if(isFinite(f)) {
                return new D(`f${f}`);
            }
            return D.dInf;
        }

        return new D(start)
            .sub(2)
            .add(idx * stepLinear)
            .add(D.pow(stepMult, idx))
            .round();
    }).filter((layer: D) => layer.gte(0) && layer.isFinite());
</script>

<section class="max-w-screen-lg p-8 mx-auto">
    <div class="flex flex-col md:flex-row gap-4 py-4">
        <label>layer(n) = {fMode ? "F" : ""}(<input type="text" bind:value={start} placeholder="1e100" /></label>
        <label>+ <input type="number" bind:value={stepLinear} placeholder="0" /> n</label>
        <label>+ <input type="number" bind:value={stepMult} placeholder="0" /> <sup>n</sup> - 1)</label>
    </div>
    <label>Spoilers: <input type="checkbox" bind:checked={spoilers} /></label>
    <label>F Mode: <input type="checkbox" bind:checked={fMode} /></label>
    <div class="flex justify-center py-4">
        <label>Page: <input type="number" bind:value={page} placeholder="0" /></label>
    </div>
    <table class="min-w-64 mx-auto">
        <tr>
            <td>Layer #</td>
            <td>Name</td>
        </tr>
        {#each layers as layer}
            <tr>
                <td>{F(layer.add(1))}</td>
                {#if !spoilers && layer.gt($game.getCurrentLayer())}
                    <td class="text-gray-400">???</td>
                {:else}
                    <td><LayerResourceName {layer}/></td>
                {/if}
            </tr>
        {/each}
    </table>
</section>

<style lang="postcss">
    input {
        @apply w-12;
    }
</style>