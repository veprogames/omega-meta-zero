<script lang="ts">
    import { game } from "../stores";
    import UiUpgrade from "../upgrade/UIUpgrade.svelte";
</script>

<UiUpgrade upgrade={$game.upgrades.tier1.additive}>
    <h3>Omega Cursor</h3>
    <p>Click the <span class="line-through">Cookie</span>Alpha automatically</p>
</UiUpgrade>