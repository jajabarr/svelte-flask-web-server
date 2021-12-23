<script lang="ts">
  import { image } from '../../actions';
  export let path: string;
  export let src: string;
  export let onImageEnter: () => void;
  export let onImageLoad: () => void;
</script>

<div class="content" use:image={{ path, src, onImageEnter, onImageLoad }} />

<style>
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
</style>
