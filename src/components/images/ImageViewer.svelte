<script lang="ts">
  import type { Directory } from '../../server-api/server-utils';
  import CachedImage from '../utility/CachedImage.svelte';
  import Lightbox from './Lightbox.svelte';

  export let path: string;
  export let items: Directory[];
</script>

<Lightbox
  {items}
  index={items.findIndex((item) => item.path === path)}
  let:src
  let:path
  let:onEnter
  let:onLoad
>
  <CachedImage {src} {path} onImageEnter={onEnter} onImageLoad={onLoad} />
</Lightbox>
