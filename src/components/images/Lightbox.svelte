<script lang="ts">
  import { Directory, serverFetchFile } from '../../server-api';
  import { viewObservable } from '../../stores';
  import CachedImage from '../utility/CachedImage.svelte';
  import LoadingBar from '../utility/LoadingBar.svelte';

  export let items: Directory[];
  export let index: number;
  export let hovering: boolean;

  let loading = false;
  let path = items[index].path;
  let src: string;

  $: {
    path = items[index].path;
    fetchSrc(path);
  }

  async function fetchSrc(path: string) {
    if (loading) {
      src = await serverFetchFile(path);
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key == 'ArrowLeft') {
      handleNavigateLeft();
    } else if (event.key == 'ArrowRight') {
      handleNavigateRight();
    }
  }

  function handleNavigateLeft() {
    index = (index - 1 + items.length) % items.length;
  }

  function handleNavigateRight() {
    index = (index + 1) % items.length;
  }

  function handleExit() {
    $viewObservable = '';
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="header-controller" class:hovering>
  <h3>{path}</h3>
  <button on:click={handleExit}>Exit</button>
</div>
<div class="navigation-controls" class:hovering>
  <img
    on:click={handleNavigateLeft}
    id="control-left"
    class="control"
    src={'/left-arrow.svg'}
    alt="left-arrow"
  />
  <img
    on:click={handleNavigateRight}
    id="control-right"
    class="control"
    src={'/left-arrow.svg'}
    alt="left-arrow"
  />
</div>
<CachedImage
  slot="content"
  {src}
  {path}
  onImageEnter={() => (loading = true)}
  onImageLoad={() => (loading = false)}
/>
{#if loading}
  <LoadingBar />
{/if}

<style>
  button {
    height: 2rem;
    width: 3rem;
    margin: 1rem;
    cursor: pointer;
  }

  h3 {
    height: 2rem;
    color: white;
  }

  .navigation-controls {
    position: absolute;
    left: 0;
    height: 5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 5rem 0 5rem;
    transform: scaleY(0);
  }

  .header-controller {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5rem;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    transform: scaleY(0);
    background-color: black;
    opacity: 0.9;
    transition: all 0.2s ease-in;
    overflow: hidden;
  }

  .hovering {
    transform: scaleY(1);
  }

  .control {
    background-size: 3rem 3rem;
    height: 4rem;
    width: 4rem;
    padding: 0.5rem;
    cursor: pointer;
    filter: invert(100%) sepia(0%) saturate(7494%) hue-rotate(308deg)
      brightness(102%) contrast(103%);
  }

  .navigation-controls:hover {
    transform: scaleY(1);
  }

  #control-right {
    transform: rotate(180deg);
  }
</style>
