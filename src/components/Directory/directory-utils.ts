import type { Directory } from '../../server-api/server-utils';

export function findDirectory(data: Directory, path: string[]) {
  const nextDir = path.length > 0 ? path[0] : null;

  if (!nextDir) {
    return data;
  }

  const fileptr = data.files.findIndex((ptr) => ptr.name == nextDir);

  if (fileptr != -1) {
    if (!data.files[fileptr]?.files || data.files[fileptr].files.length <= 0) {
      return data;
    }
    return findDirectory(data.files[fileptr], path.slice(1));
  }

  console.warn('did not find directory');
  return data;
}
