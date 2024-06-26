<script lang="ts">
    import { D } from "../decimal";
    import { F } from "../format";
    import LayerResourceName from "../layers/LayerResourceName.svelte";
    import { game } from "../stores";

    const PER_PAGE = 10;

    let start = "0";
    let page = 0;
    let stepLinear = 1;
    let stepMult = 1;
    let stepPow = 1;
    let stepTetr = 0;

    let spoilers = false;

    $: layers = Array.from({length: 10}, (_, i) => {
        const idx = i + page * PER_PAGE;
        return new D(start)
            .add(idx * stepLinear)
            .mul(D.pow(stepMult, idx))
            .pow(D.pow(stepPow, idx))
            .tetrate(stepTetr >= 1 ? stepTetr * idx : 1)
            .floor();
    }).filter((layer: D) => spoilers ? layer.lte($game.getCurrentLayer()) : true && layer.gte(0));
</script>

<section class="max-w-screen-lg p-8 mx-auto">
    <div class="flex flex-wrap gap-4 py-4">
        <label>Start: <input type="text" bind:value={start} placeholder="1e100" /></label>
        <label>+Linear: <input type="number" bind:value={stepLinear} placeholder="0" /></label>
        <label>*Multi: <input type="number" bind:value={stepMult} placeholder="0" step="0.1" /></label>
        <label>^Power: <input type="number" bind:value={stepPow} placeholder="0" step="0.01" /></label>
        <label>^^Tetrate: <input type="number" bind:value={stepTetr} placeholder="0" step="0.001" /></label>
        <label>Spoilers: <input type="checkbox" bind:checked={spoilers} /></label>
    </div>
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
                <td><LayerResourceName {layer}/></td>
            </tr>
        {/each}
    </table>
</section>