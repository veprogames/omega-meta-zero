<script lang="ts">
    import { game } from "../stores";
    import UiUpgrade from "../upgrade/UIUpgrade.svelte";
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <UiUpgrade upgrade={$game.upgrades.tier1.additiveCursor}>
        <h3>Omega Cursor</h3>
        <p>Click the <span class="line-through">Cookie</span>Alpha automatically</p>
    </UiUpgrade>
    <UiUpgrade upgrade={$game.upgrades.tier1.additiveGrandma}>
        <h3>Omegrandma</h3>
        <p>The Grandma automatically bakes Alpha for you.</p>
    </UiUpgrade>
    <UiUpgrade upgrade={$game.upgrades.tier1.additiveFirstDimension}>
        <h3>1st <span class="line-through">Antimatter</span> Dimension</h3>
        <p>What is a Dimension doing here?!?</p>
    </UiUpgrade>
</div>