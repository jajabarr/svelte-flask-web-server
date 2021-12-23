<script lang="ts">
  import { onSubscribe, pathObservable } from '../../stores';
  import DirectoryGrid from './DirectoryGrid.svelte';

  let path = '';
  let titlePath: { name: string; path: string }[] = [];

  function makeTitlePath() {
    titlePath = path
      .split('/')
      .slice(1)
      .map((pathNode, index, arr) => {
        return {
          name: pathNode,
          path: './' + arr.slice(0, index + 1).join('/')
        };
      });
  }

  onSubscribe(pathObservable, (currentPath) => {
    path = currentPath;
    makeTitlePath();
  });

  function navigate(path: string) {
    pathObservable.set(path);
  }
</script>

<div class="container">
  <span tabindex="0" id="directory-title">
    {#each titlePath as pathNode}
      <h4
        tabindex="-1"
        on:click={() => navigate(pathNode.path)}
        id="directory-path"
      >
        /{pathNode.name}
      </h4>
    {/each}
  </span>
  <DirectoryGrid />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 1rem 1rem 0 1rem;
  }

  #directory-title {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #ff3e00;
    padding-bottom: 1.5rem;
    height: 2rem;
  }

  #directory-path {
    cursor: pointer;
  }

  #directory-path:hover {
    color: #ff3e00;
  }
</style>
