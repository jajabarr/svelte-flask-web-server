import type { Store } from '../stores';
export function highlightId(
  node: HTMLElement,
  args: { path: string; store: Store<{}, string> }
) {
  const { path, store } = args;
  function setHighlight(currentPath: string) {
    if (currentPath == path) {
      node.style.setProperty('background-color', 'rgba(255, 62, 0, 0.2)');
    } else {
      node.style.setProperty('background-color', 'transparent');
    }
  }

  const unsubscribe = store.subscribe(setHighlight);

  return {
    destroy() {
      unsubscribe();
    }
  };
}
