import { writable } from 'svelte/store';

export const pathObservable = (() => {
  const { subscribe, set } = writable('');

  const navigate = (path: string) => {
    set(path);
  };

  return {
    subscribe,
    navigate
  };
})();
