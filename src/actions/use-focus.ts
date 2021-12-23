import type { Store } from '../stores';

export function focusId(
  node: HTMLElement,
  args: { path: string; store: Store<{ set: (v: string) => void }, string> }
) {
  let { path, store } = args;
  const handleOnClick = () => {
    store.set(path);
  };
  node.onclick = handleOnClick;

  return {
    update({ path: nextPath }) {
      path = nextPath;
    }
  };
}
