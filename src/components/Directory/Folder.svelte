<script lang="ts">
  import type { Directory, ItemType } from '../../server-api/server-utils';
  import Hoverable from '../utility/Hoverable.svelte';
  import File from './File.svelte';
  import AddDirectoryItem from './AddDirectoryItem.svelte';
  import DirectoryActions from './DirectoryActions.svelte';
  import { focusId, highlightId } from '../../actions';
  import { pathObservable } from '../../stores';

  export let expanded = true;
  export let name: string;
  export let path: string;
  export let root = false;
  export let files: Directory[] = [];
  export let onItemRemove: (path: string, type: ItemType) => Promise<void>;
  export let onItemAdd: (path: string, type: ItemType) => Promise<void>;

  let insert = false;
  let insertType: ItemType;

  function toggle() {
    expanded = !expanded;
  }

  function onInsertDirectory() {
    insertType = 'DIRECTORY';
    insert = true;
  }

  function onInsertFile() {
    insertType = 'FILE';
    insert = true;
  }

  function cancel() {
    insert = false;
  }

  async function handleOnItemAdd(path: string, type: ItemType): Promise<void> {
    await onItemAdd(path, type);
    insert = false;
    expanded = true;
  }
</script>

<Hoverable let:hovering>
  <span
    class="directory"
    class:expanded
    use:highlightId={{ path, store: pathObservable }}
    use:focusId={{ path, store: pathObservable }}
    on:click={toggle}>{name}</span
  >
  {#if hovering}
    <DirectoryActions
      {path}
      {onInsertDirectory}
      {onInsertFile}
      {onItemRemove}
      itemType={'DIRECTORY'}
      showDelete={!root}
    />
  {/if}
</Hoverable>

{#if insert}
  <div>
    <AddDirectoryItem
      type={insertType}
      onAccept={handleOnItemAdd}
      onCancel={cancel}
      {path}
    />
  </div>
{/if}

{#if expanded}
  <ul>
    {#each files as file}
      <li>
        {#if file.files}
          <svelte:self {...file} {onItemRemove} {onItemAdd} />
        {:else}
          <File {...file} {onItemRemove} />
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  .directory {
    padding: 0 0 0 1.5rem;
    background: url(/folder.svg) 0 no-repeat;
    background-size: 1rem 1rem;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }

  .expanded {
    background-image: url(/folder-open.svg);
  }

  ul {
    padding: 0.2rem 0 0 0.5rem;
    margin: 0 0 0 0.5rem;
    list-style: none;
    border-left: 1px solid #eee;
  }

  li {
    padding: 0.2rem 0;
  }

  .focus {
    background-color: rgba(255, 0, 0, 0.2);
  }
</style>
