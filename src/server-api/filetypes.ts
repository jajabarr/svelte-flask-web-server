import type { Directory } from './server-utils';

const IMAGES = ['jpg', 'png'] as const;
const VIDEOS = ['mp4'] as const;

export type IMAGE = typeof IMAGES[number];
export type VIDEO = typeof VIDEOS[number];

export type FILETYPE = 'video' | 'image';

const isType = (name: string, type: FILETYPE) => {
  let test: typeof IMAGES | typeof VIDEOS;
  switch (type) {
    case 'video':
      test = VIDEOS;
      break;
    case 'image':
      test = IMAGES;
      break;
  }

  for (let i = 0; i < test.length; ++i) {
    if (name.endsWith(test[i])) {
      return true;
    }
  }

  return false;
};

export const isImage = (name: string) => {
  return isType(name, 'image');
};

export const isVideo = (name: string) => {
  return isType(name, 'video');
};

export const isMedia = (name: string) => {
  return isImage(name) || isVideo(name);
};

export const filterImages = (files: Directory[]) => {
  return files.filter((file) => isImage(file.name));
};

export const filterVideos = (files: Directory[]) => {
  return files.filter((file) => isVideo(file.name));
};

export const filterMedia = (files: Directory[]) => {
  return files.filter((file) => isVideo(file.name) || isImage(file.name));
};
