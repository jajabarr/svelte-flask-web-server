<script lang="ts">
  import type { Directory } from '../../server-api/server-utils';
  import { writable } from 'svelte/store';
  import {
    filterImages,
    filterVideos,
    isImage,
    isVideo
  } from '../../server-api';
  import {
    onSubscribe,
    directoryObservable,
    viewObservable
  } from '../../stores';
  import DirectoryItem from './DirectoryItem.svelte';
  import ImageViewer from '../images/ImageViewer.svelte';
  import VideoPlayer from '../videos/VideoPlayer.svelte';

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

{#if currentFile && isImage(currentFile)}
  <ImageViewer path={currentFile} items={filterImages(gridData?.files)} />
{:else if currentFile && isVideo(currentFile)}
  <VideoPlayer path={currentFile} items={filterVideos(gridData?.files)} />
{:else}
  <div id="directory-grid" on:click={() => activeItemStore.set('')}>
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
    height: 100%;
  }
</style>
