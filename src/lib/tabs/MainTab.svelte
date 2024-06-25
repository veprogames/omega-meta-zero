<script lang="ts">
    import { D } from "../decimal";
    import { F } from "../format";
    import LayerResource from "../layers/LayerResource.svelte";
    import { getLayerOrdinal } from "../layers/layers";
    import { game } from "../stores";

    
</script>

<div class="flex flex-col justify-center items-center h-screen text-center">
    <div class="text-4xl md:text-6xl lg:text-8xl">
        <LayerResource points={$game.points}/>
    </div>
    <div class="flex flex-col gap-4 pt-16">
        <p>You are on Layer <span class="font-bold">{F(getLayerOrdinal($game.points).add(1))}</span></p>
        <div>That is also: <LayerResource layer={new D(0)} points={$game.points}/></div>
    </div>
</div>