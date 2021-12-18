<script lang="ts">
  import type { ItemType } from './../server-utils';

  export let path: string;
  export let type: ItemType;
  export let onAccept: (path: string, type: ItemType) => Promise<void>;

  export let onCancel: () => void;
  let name: string;

  function onSubmit() {
    onAccept(`${path}/${name}`, type);
  }

  function handleKeydown(evt: KeyboardEvent) {
    if (evt.code === 'Enter') {
      onSubmit();
    } else if (evt.code === 'Escape') {
      onCancel();
    }
  }
</script>

<input autofocus on:keydown={handleKeydown} bind:value={name} />
<span on:click={onSubmit}>confirm</span>
<span on:click={onCancel}>cancel</span>

<style>
  input {
    padding: 0.2rem;
  }

  span {
    cursor: pointer;
    font-size: 0.7rem;
  }

  span:hover {
    text-decoration: underline;
  }
</style>
