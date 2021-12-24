<script lang="ts">
  import type { Directory } from '../../server-api';
  import Lightbox from '../images/Lightbox.svelte';
  import TextViewer from './TextViewer.svelte';

  export let path: string;
  export let items: Directory[];

  $: index = items.findIndex((item) => item.path === path);
</script>

<Lightbox {index} {items} let:src let:onLoad>
  <TextViewer {src} {onLoad} />
</Lightbox>
