<script lang="ts">
  import type { Directory } from '../../../server-api/server-utils';
  import FullscreenController from '../../utility/FullscreenController.svelte';
  import Lightbox from './Lightbox.svelte';

  export let path: string;
  export let related: Directory[];
</script>

<FullscreenController let:hovering>
  <div class="image" slot="content">
    <Lightbox
      {hovering}
      items={related}
      index={related.findIndex((item) => item.path === path)}
    />
  </div>
</FullscreenController>

<style>
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 95%;
  }
</style>
