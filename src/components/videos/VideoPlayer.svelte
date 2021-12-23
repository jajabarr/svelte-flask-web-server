<script lang="ts">
  import type { Directory } from '../../server-api';
  import Lightbox from '../images/Lightbox.svelte';

  export let path: string;
  export let items: Directory[];

  $: index = items.findIndex((item) => item.path === path);
</script>

<Lightbox {index} {items} let:src let:onLoad>
  {#if src}
    <video {src} controls autoplay preload="none" on:canplay={onLoad}>
      <track kind="captions" />
    </video>
  {/if}
</Lightbox>

<style>
  video {
    height: 70%;
    max-height: 70%;
    max-width: 70%;
  }
</style>
