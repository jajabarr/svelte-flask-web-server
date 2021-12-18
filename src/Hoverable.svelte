<script lang="ts">
  let hovering = false;

  function enter() {
    hovering = true;
  }

  function leave() {
    hovering = false;
  }
</script>

<span on:mouseenter={enter} on:mouseleave={leave}>
  <slot {hovering} />
</span>

<style>
  span {
    position: relative;
  }
</style>
