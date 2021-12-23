import {
  appendImage,
  createImage,
  fetchCachedImage,
  saveImage
} from './use-thumbnail';

export function image(
  node: HTMLElement,
  args: {
    path: string;
    src: string;
    onImageEnter: () => void;
    onImageLoad: () => void;
  }
) {
  let { path, src, onImageEnter, onImageLoad } = args;
  let currentImage: HTMLImageElement;

  function renderImage() {
    const cachedImage = fetchCachedImage(path);

    if (cachedImage) {
      appendImage(node, cachedImage, onImageEnter);
      currentImage = cachedImage;
      onImageLoad();
      return;
    }

    if (!src) {
      return;
    }

    const image = createImage(node, path, src, onImageLoad);
    currentImage = image;
  }

  renderImage();

  return {
    update({
      path: nextPath,
      src: nextSrc,
      onImageEnter: nextOnImageEnter,
      onImageLoad: nextOnImageLoad
    }) {
      src = nextSrc;
      onImageLoad = nextOnImageLoad;
      onImageEnter = nextOnImageEnter;

      if (path === nextPath && currentImage) {
        return;
      }
      path = nextPath;
      saveImage(currentImage);
      renderImage();
    },
    destroy() {
      saveImage(currentImage);
    }
  };
}
