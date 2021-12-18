<script lang="ts">
  import type { ItemType } from './../server-utils';
  import DirectoryActions from './DirectoryActions.svelte';
  import Hoverable from './../Hoverable.svelte';
  import { navigation } from '../actions/use-focus-navigation';

  export let name: string;
  export let path: string;
  export let onItemRemove: (path: string, type: ItemType) => Promise<void>;
</script>

<Hoverable let:hovering>
  <span use:navigation={path}>
    {name}
  </span>
  {#if hovering}
    <DirectoryActions
      {path}
      {onItemRemove}
      itemType={'FILE'}
      showDelete={true}
    />
  {/if}
</Hoverable>

<style>
  span {
    padding: 0 0 0 1.5rem;
    background: url(/xlsx.svg) 0 no-repeat;
    background-size: 1rem 1rem;
    cursor: pointer;
    user-select: none;
  }
</style>
