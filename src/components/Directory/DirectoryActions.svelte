<script lang="ts">
  import type { ItemType } from '../../server-api/server-utils';

  export let onInsertFile: () => void | undefined = undefined;
  export let onInsertDirectory: () => void | undefined = undefined;
  export let onItemRemove: (
    path: string,
    type: ItemType
  ) => Promise<void> | undefined;
  export let itemType: ItemType;
  export let showDelete = false;
  export let path: string;

  function removeItem() {
    onItemRemove(path, itemType);
  }
</script>

<div>
  {#if !!onInsertFile}
    <p on:click={onInsertFile}>file</p>
  {/if}
  {#if !!onInsertDirectory}
    <p on:click={onInsertDirectory}>folder</p>
  {/if}
  {#if showDelete && !!onItemRemove}
    <p on:click={removeItem}>remove</p>
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 100%;
    top: 0;
    cursor: pointer;
    font-size: 0.7rem;
    padding-top: 0.1rem;
    height: 100%;
  }

  p {
    margin-left: 0.5rem;
    font-style: italic;
  }

  p:hover {
    text-decoration: underline;
  }
</style>
