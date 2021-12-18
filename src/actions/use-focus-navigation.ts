import { pathObservable } from '../stores';
export function navigation(node: HTMLElement, path: string) {
  function setHighlight(currentPath: string) {
    if (currentPath == path) {
      node.style.setProperty('background-color', 'rgba(255, 62, 0, 0.2)');
    } else {
      node.style.setProperty('background-color', 'transparent');
    }
  }

  const unsubscribe = pathObservable.subscribe(setHighlight);

  node.onclick = function () {
    pathObservable.navigate(path);
  };

  return {
    destroy() {
      unsubscribe();
    }
  };
}
