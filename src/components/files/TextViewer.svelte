<script lang="ts">
  export let src: string;
  export let onLoad: () => void;
  let textContent = '';

  async function fetchBlobData(src: string) {
    if (!src) {
      return;
    }
    const response = await fetch(src);
    const data = await response.blob();
    textContent = await data.text();
    onLoad();
  }

  $: fetchBlobData(src);
</script>

<pre>{textContent}</pre>

<style>
  pre {
    height: 90%;
    width: 90%;
    color: white;
    border-left: 0.01rem solid white;
    padding-left: 1rem;
    overflow: auto;
  }
</style>
