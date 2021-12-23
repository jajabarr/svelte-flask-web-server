import { isVideo } from './server-api';

export const createVideoThumbnail = async (videoBlobUrl: string) => {
  const video = document.createElement('video');
  video.setAttribute('src', videoBlobUrl);
  video.load();

  const thumbnailUrl = await new Promise<string>((resolve) => {
    video.onloadedmetadata = () => {
      video.currentTime = video.duration * 0.1;

      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.canvas.toBlob(
          (blob) => resolve(URL.createObjectURL(blob)),
          'image/jpeg',
          1
        );
      };
    };
  });

  return thumbnailUrl;
};

export const getThumbnailPath = (path: string) => {
  return isVideo(path) ? `img:${path}` : path;
};
