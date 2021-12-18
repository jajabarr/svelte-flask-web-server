<script lang="ts">
  import Directory from './Directory/Directory.svelte';
  import DirectoryInsight from './DirectoryInsight/DirectoryInsight.svelte';
</script>

<main>
  <Directory />
  <DirectoryInsight />
</main>

<style>
  main {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    width: 100%;
    height: 100%;
    /* padding: 25px; */
  }
</style>
