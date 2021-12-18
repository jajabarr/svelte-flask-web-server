<script lang="ts">
  import { onSubscribe, pathObservable } from '../stores';

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
    console.log(`SET PATH:\n\tpath: ${currentPath}`);
    makeTitlePath();
  });

  function navigate(path: string) {
    pathObservable.navigate(path);
  }
</script>

<div class="container">
  <span id="directory-title">
    {#each titlePath as pathNode}
      <h4 on:click={() => navigate(pathNode.path)} id="directory-path">
        /{pathNode.name}
      </h4>
    {/each}
  </span>
  <div id="directory-content" />
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

  #directory-content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>
