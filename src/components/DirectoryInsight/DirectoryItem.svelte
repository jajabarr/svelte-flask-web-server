<script lang="ts">
  import { highlightId, thumbnail, viewId } from '../../actions';

  import type { Directory } from '../../server-api/server-utils';
  import { pathObservable, Store, viewObservable } from '../../stores';

  export let activeItemStore: Store<{ set: (id: string) => void }, string>;
  export let dirptr: Directory;
</script>

<div
  class="directory-node"
  use:highlightId={{ path: dirptr.path, store: activeItemStore }}
>
  {#if !!dirptr.files}
    <div
      use:viewId={{
        path: dirptr.path,
        $singleClick: activeItemStore,
        $dblClick: pathObservable
      }}
      class="directory"
    />
  {:else}
    <div
      use:viewId={{
        path: dirptr.path,
        $singleClick: activeItemStore,
        $dblClick: viewObservable
      }}
      use:thumbnail={dirptr.path}
      class="file"
    />
  {/if}
  <span class="directory-name">{dirptr.name}</span>
</div>

<style>
  .directory-node {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    padding: 0.3rem;
  }

  .directory {
    background: url(/folder.svg) 0 no-repeat;
    background-position: center;
    cursor: pointer;
    height: 5rem;
    width: 100%;
  }

  .file {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(/xlsx.svg) 0 no-repeat;
    background-position: center;
    cursor: pointer;
    height: 5rem;
    width: 100%;
  }

  .directory-name {
    text-align: center;
    word-break: break-all;
  }
</style>
