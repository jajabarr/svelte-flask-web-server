import { onDestroy } from 'svelte';
import type { Store } from './interfaces';

export const onSubscribe = <T, V>(
  store: Store<T, V>,
  cb: (value: V) => void
) => {
  const unsubscribe = store.subscribe(cb);

  onDestroy(unsubscribe);
};
