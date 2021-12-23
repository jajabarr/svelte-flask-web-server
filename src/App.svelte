<script lang="ts">
  import Directory from './components/Directory/Directory.svelte';
  import DirectoryInsight from './components/DirectoryInsight/DirectoryInsight.svelte';
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
    width: 100vw;
    height: 100vh;
  }
</style>
