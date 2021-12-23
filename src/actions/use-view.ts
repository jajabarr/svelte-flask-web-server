import type { Store } from '../stores';

export function viewId(
  node: HTMLElement,
  args: {
    path: string;
    $singleClick: Store<{ set: (v: string) => void }, string>;
    $dblClick: Store<{ set: (v: string) => void }, string>;
  }
) {
  let { path, $singleClick, $dblClick } = args;

  let dblClickReady = false;
  let tId: NodeJS.Timeout;

  const onClickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    $singleClick.set(path);

    if (dblClickReady) {
      $dblClick.set(path);
    }

    dblClickReady = true;

    tId = setTimeout(() => {
      dblClickReady = false;
    }, 500);
  };

  node.onclick = onClickHandler;

  return {
    update({ path: nextPath }) {
      clearTimeout(tId);
      path = nextPath;
    },
    destroy() {
      clearTimeout(tId);
    }
  };
}
