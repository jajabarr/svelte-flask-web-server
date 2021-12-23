interface ICache {
  write: (path: string, data: string) => void;
  read: (path: string) => string;
}

export const fileCache: ICache = {
  write(path: string, data: string) {
    this[path] = data;
  },
  read(path) {
    const result: string | undefined = this[path];

    return result ?? null;
  }
};
