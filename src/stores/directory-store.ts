import { writable } from 'svelte/store';

export const directoryObservable = (() => {
  const { subscribe, set } = writable({});

  return {
    subscribe,
    set
  };
})();
