import { writable } from 'svelte/store';
import { viewObservable } from './view-store';

export const pathObservable = (() => {
  const { subscribe, set } = writable('');

  function onSet(path: string) {
    viewObservable.set('');

    set(path);
  }

  return {
    subscribe,
    set: onSet
  };
})();
