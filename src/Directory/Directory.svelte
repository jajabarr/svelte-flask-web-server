<script lang="ts">
  import { onMount } from 'svelte';

  import Folder from './Folder.svelte';
  import {
    Directory,
    routes,
    serverRemoveItem,
    serverAddItem,
    serverWrapper,
    ItemType
  } from './../server-utils';

  let directoryData: Directory[] = [];

  async function fetchDirectory() {
    directoryData = await serverWrapper(routes.directory);
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
