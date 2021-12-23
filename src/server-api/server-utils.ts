import { fileCache as cache } from './file-cache';

const host = 'http://localhost:8080';

export interface File {
  name: string;
  path: string;
}

export interface Directory extends File {
  files?: Directory[];
}

export const routes = {
  directory: `${host}/directory`,
  file: `${host}/file`
};

export type ResponseType = 'json' | 'blob';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ItemType = 'DIRECTORY' | 'FILE';

export const serverWrapper = async (
  route: string,
  method: Method = 'GET',
  responseType: ResponseType = 'json',
  data?: { [key: string]: any }
) => {
  console.log(
    `API REQUEST:\n\troute: ${route}\n\tmethod: ${method}\n\tdata: ${JSON.stringify(
      data,
      undefined,
      2
    )}`
  );
  const response = await fetch(route, {
    method,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    return undefined;
  }

  switch (responseType) {
    case 'json': {
      return await response.json();
    }
    case 'blob': {
      return await response.blob();
    }
  }
};

export const getBlobUrlForFile = (blob: Blob) => {
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
};

export const serverFetchFile = async (path: string) => {
  const cachedResult = cache.read(path);

  if (!!cachedResult) {
    return cachedResult;
  }

  const response = await serverWrapper(routes.file, 'POST', 'blob', { path });
  const url = getBlobUrlForFile(response);

  cache.write(path, url);

  return url;
};

export const serverFetchDirectory = async () => {
  return await serverWrapper(routes.directory, 'GET', 'json');
};

export const serverRemoveItem = async (path: string, type: ItemType) => {
  await serverWrapper(routes.directory, 'DELETE', 'json', { path, type });
  return await serverWrapper(routes.directory);
};

export const serverAddItem = async (path: string, type: ItemType) => {
  await serverWrapper(routes.directory, 'POST', 'json', { path, type });
  return await serverWrapper(routes.directory);
};
