<script lang="ts">
  import { mouseover } from '../../actions';

  let hovering = false;

  function onMouseEnter() {
    hovering = true;
  }

  function onMouseLeave() {
    hovering = false;
  }
</script>

<div id="fullscreen-view" class="container">
  <div
    id="fullscreen-wrapper"
    use:mouseover={{ onEnter: onMouseEnter, onLeave: onMouseLeave }}
  >
    <slot {hovering} />
  </div>
</div>

<style>
  #fullscreen-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: black;
  }
</style>
