<script lang="ts">
  import type { ItemType } from '../../server-api/server-utils';
  import DirectoryActions from './DirectoryActions.svelte';
  import Hoverable from '../utility/Hoverable.svelte';
  import { focusId, highlightId } from '../../actions';
  import { pathObservable } from '../../stores';

  export let name: string;
  export let path: string;
  export let onItemRemove: (path: string, type: ItemType) => Promise<void>;
</script>

<Hoverable let:hovering>
  <span
    use:highlightId={{ path, store: pathObservable }}
    use:focusId={{ path, store: pathObservable }}
  >
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
