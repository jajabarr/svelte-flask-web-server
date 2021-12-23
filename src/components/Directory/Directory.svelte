<script lang="ts">
  import { onMount } from 'svelte';

  import Folder from './Folder.svelte';
  import {
    Directory,
    routes,
    serverRemoveItem,
    serverAddItem,
    serverWrapper,
    ItemType,
    serverFetchDirectory
  } from '../../server-api/server-utils';
  import { onSubscribe, pathObservable } from '../../stores';
  import { findDirectory } from './directory-utils';
  import { directoryObservable } from '../../stores';

  let directoryData: Directory[] = [];

  async function fetchDirectory() {
    directoryData = await serverFetchDirectory();
  }

  async function removeItem(path: string, type: ItemType) {
    directoryData = await serverRemoveItem(path, type);
  }

  async function addItem(path: string, type: ItemType) {
    directoryData = await serverAddItem(path, type);
  }

  onMount(() => {
    fetchDirectory();
  });

  onSubscribe(pathObservable, (path) => {
    const dirPtr: Directory = findDirectory(
      { name: 'sfsk_webserver_root', path: '', files: directoryData },
      path.split('/').slice(2)
    );

    directoryObservable.set(dirPtr);
  });
</script>

<div class="container">
  <button on:click={fetchDirectory}>Refresh Directory</button>
  <div class="directory">
    <Folder
      name="Home"
      path="./sfsk_webserver_root"
      root
      files={directoryData}
      expanded
      onItemAdd={addItem}
      onItemRemove={removeItem}
    />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    width: 15rem;
    height: 100%;
    padding: 1rem 1rem 0 1rem;
  }

  button {
    width: 100%;
    margin-bottom: 1.5rem;
    height: 2rem;
    cursor: pointer;
  }

  .directory {
    overflow: auto;
    height: 100%;
    border-right: 1px solid #ff3e00;
  }
</style>
