import { isImage, isMedia, isVideo } from '../server-api';
import { serverFetchFile } from '../server-api/server-utils';
import { getThumbnailPath } from '../utility';

export function fetchCachedImage(path: string) {
  const cachedImage: HTMLImageElement = document.getElementById(
    path
  ) as HTMLImageElement;

  return cachedImage;
}

export function saveImage(img: HTMLImageElement) {
  if (!img) {
    return;
  }
  img.setAttribute('height', '0');
  document.body.appendChild(img);
  img = undefined;
}

export function appendImage(
  node: HTMLElement,
  img: HTMLImageElement,
  onImageEnter?: () => void,
  onImageLoad?: () => void
) {
  document.body.removeChild(img);
  const { height } = node.getBoundingClientRect();
  const resolutionHeight = img.naturalHeight;
  const imgBoundingHeight = Math.min(height, resolutionHeight || height);
  img.setAttribute('height', `${imgBoundingHeight}`);
  node.removeAttribute('background');
  img.onloadeddata = onImageLoad;
  onImageEnter?.();
  node.appendChild(img);
}

export function createImage(
  node: HTMLElement,
  path: string,
  src: string,
  onImageEnter?: () => void,
  onImageLoad?: () => void
) {
  const img = document.createElement('img');
  img.id = path;
  img.setAttribute('max-width', `100%`);
  img.setAttribute('max-height', `100%`);
  img.setAttribute('height', '0');
  img.setAttribute('src', src);
  img.setAttribute('alt', '');
  document.body.appendChild(img);

  img.onload = () => {
    if (!isMedia(path)) {
      return;
    }
    appendImage(node, img, onImageEnter, onImageLoad);
  };

  return img;
}

export function thumbnail(node: HTMLElement, path: string) {
  let imageRef: HTMLImageElement;

  const renderThumbnail = async () => {
    if (!isMedia(path)) {
      return;
    }

    const thumbnailPath = getThumbnailPath(path);
    const cachedImage = fetchCachedImage(thumbnailPath);

    if (cachedImage) {
      appendImage(node, cachedImage);
      imageRef = cachedImage;
      return;
    }

    const blobUrl = await serverFetchFile(path, true /* thumbnail */);
    const img = createImage(node, thumbnailPath, blobUrl);

    imageRef = img;
  };

  renderThumbnail();

  return {
    update(nextPath: string) {
      saveImage(imageRef);
      path = nextPath;
      renderThumbnail();
    },
    destroy() {
      saveImage(imageRef);
    }
  };
}
