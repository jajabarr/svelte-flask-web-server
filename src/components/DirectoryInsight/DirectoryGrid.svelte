<script lang="ts">
  import type { Directory } from '../../server-api/server-utils';
  import { writable } from 'svelte/store';
  import { filterImages, filterMedia } from '../../server-api';
  import {
    onSubscribe,
    directoryObservable,
    viewObservable
  } from '../../stores';
  import DirectoryItem from './DirectoryItem.svelte';
  import ImageViewer from './ImageViewer.svelte';

  let gridData: Directory;
  let currentFile = '';

  const activeItemStore = (() => {
    const { subscribe, set } = writable('');

    return {
      subscribe,
      set
    };
  })();

  onSubscribe(directoryObservable, (directory: Directory) => {
    gridData = directory;
    activeItemStore.set('');
  });

  onSubscribe(viewObservable, (currentView) => {
    currentFile = currentView;
  });
</script>

{#if currentFile}
  <ImageViewer path={currentFile} related={filterImages(gridData?.files)} />
{:else}
  <div id="directory-grid">
    {#each gridData?.files || [] as dirptr}
      <DirectoryItem {dirptr} {activeItemStore} />
    {/each}
  </div>
{/if}

<style>
  #directory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 10%);
    column-gap: 1rem;
    row-gap: 1rem;
    justify-content: start;
    align-items: start;
    padding-top: 2rem;
  }
</style>
