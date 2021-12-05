const host = 'localhost:8080';

export const routes = {
  home: host
}

export const serverWrapper = (route: string) => {
  const response = await fetch(route);

  if (!response.ok) {
    return undefined;
  }

  const data = await response.json();

  return data;
}