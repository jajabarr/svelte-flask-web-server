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

export function getImageBoundRect(
  img: HTMLImageElement,
  parentNode: HTMLElement
) {
  const { naturalHeight, naturalWidth } = img;
  const { height, width } = parentNode.getBoundingClientRect();

  const constraint = Math.max(naturalHeight, naturalWidth);
  const boundingLength = Math.min(constraint, height, width);

  const aspectRatio = constraint / (naturalHeight + naturalWidth - constraint);

  if (naturalHeight > naturalWidth) {
    return {
      height: boundingLength,
      width: boundingLength * (1 / aspectRatio)
    };
  }

  return {
    height: boundingLength * (1 / aspectRatio),
    width: boundingLength
  };
}

export function appendImage(
  node: HTMLElement,
  img: HTMLImageElement,
  onImageEnter?: () => void,
  onImageLoad?: () => void
) {
  document.body.removeChild(img);
  const { width, height } = getImageBoundRect(img, node);
  img.setAttribute('height', `${height}`);
  img.setAttribute('width', `${width}`);
  node.style.background = 'none';
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

  const onImgLoad = () => {
    img.onload = null;

    if (!isMedia(path)) {
      return;
    }

    appendImage(node, img, onImageEnter, onImageLoad);
  };

  img.onload = onImgLoad;

  return img;
}

export function thumbnail(node: HTMLElement, path: string) {
  let imageRef: HTMLImageElement;
  let nodeBackgroundRef = '';

  const renderThumbnail = async () => {
    nodeBackgroundRef = node.style.background;

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
      //TODO this causes jank?
      node.style.background = nodeBackgroundRef;
      saveImage(imageRef);
      path = nextPath;
      renderThumbnail();
    },
    destroy() {
      saveImage(imageRef);
    }
  };
}
