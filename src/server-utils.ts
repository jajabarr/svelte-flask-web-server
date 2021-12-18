const host = 'http://localhost:8080';

export interface File {
  name: string;
  path: string;
}

export interface Directory extends File {
  files?: File[];
}

export const routes = {
  directory: `${host}/directory`
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ItemType = 'DIRECTORY' | 'FILE';

export const serverWrapper = async (
  route: string,
  method: Method = 'GET',
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

  const responseData = await response.json();

  return responseData;
};

export const serverRemoveItem = async (path: string, type: ItemType) => {
  await serverWrapper(routes.directory, 'DELETE', { path, type });
  return await serverWrapper(routes.directory);
};

export const serverAddItem = async (path: string, type: ItemType) => {
  await serverWrapper(routes.directory, 'POST', { path, type });
  return await serverWrapper(routes.directory);
};
