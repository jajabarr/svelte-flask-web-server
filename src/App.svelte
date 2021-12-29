<script lang="ts">
  import Create from './components/auth/Create.svelte';
  import Directory from './components/Directory/Directory.svelte';
  import DirectoryInsight from './components/DirectoryInsight/DirectoryInsight.svelte';
  import { userObservable } from './stores/user-store';
</script>

<main>
  {#if $userObservable.name}
    <Directory />
    <DirectoryInsight />
  {:else}
    <Create />
  {/if}
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
