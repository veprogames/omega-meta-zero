<script lang="ts">
    import type { ComponentType } from "svelte";
    import OptionsTab from "./OptionsTab.svelte";
    import MainTab from "./MainTab.svelte";

    interface Tab {
        title: string,
        component: ComponentType,
    }

    const items: Tab[] = [
        {
            title: "Main",
            component: MainTab,
        },
        {
            title: "Options",
            component: OptionsTab,
        },
    ];

    let current: Tab = items[0];
</script>

<div>
    <svelte:component this={current.component}></svelte:component>
</div>

<div class="fixed bottom-0 left-0 w-full flex justify-center gap-4 p-4 bg-black bg-opacity-50 z-10">
    {#each items as item}
        <button on:click={() => current = item}>{item.title}</button>
    {/each}
</div>