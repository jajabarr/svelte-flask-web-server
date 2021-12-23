import { writable } from 'svelte/store';

export const viewObservable = (() => {
  const { subscribe, set } = writable('');

  return {
    subscribe,
    set
  };
})();
