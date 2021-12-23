export function mouseover(
  node: HTMLElement,
  args: { onEnter: () => void; onLeave: () => void }
) {
  let { onEnter, onLeave } = args;
  let tid: NodeJS.Timeout;

  // TODO: Throttle
  const onMouseMove = () => {
    clearTimeout(tid);

    onEnter();

    tid = setTimeout(() => {
      onLeave();
    }, 2000);
  };

  node.onmousemove = onMouseMove;

  return {
    update() {
      clearTimeout(tid);
    },
    destroy() {
      clearTimeout(tid);
    }
  };
}
