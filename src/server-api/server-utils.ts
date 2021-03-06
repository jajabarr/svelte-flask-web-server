import { isVideo } from ".";
import { createVideoThumbnail } from "../utility";
import { fileCache as cache } from "./file-cache";

const host = "http://localhost:8080";

export interface File {
    name: string;
    path: string;
}

export interface Directory extends File {
    files?: Directory[];
}

export const routes = {
    directory: `${host}/directory`,
    file: `${host}/file`,
    create: `${host}/create`,
    login: `${host}/login`,
};

export type ResponseType = "json" | "blob";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export type ItemType = "DIRECTORY" | "FILE";

export const serverWrapper = async (
    route: string,
    method: Method = "GET",
    responseType: ResponseType = "json",
    options: {
        headers?: { [key: string]: any };
        data?: { [key: string]: any };
    } = {
        headers: {},
        data: {},
    }
) => {
    const ts = performance.now();
    const { headers, data } = options;
    const response = await fetch(route, {
        method,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json",
            ...headers,
        },
        body: method === "POST" ? JSON.stringify(data) : undefined,
    });

    console.log(
        `API RESPONSE [ ${response.status} ] / ${
            performance.now() - ts
        }ms :\n\troute: ${route}\n\tmethod: ${method}\n\tdata: ${JSON.stringify(
            data,
            undefined,
            2
        )}\n\n\tPARAMS:\n\n${JSON.stringify(options, undefined, 2)}`
    );

    if (!response.ok) {
        const msg = await response.json();
        return [undefined, msg.message];
    }

    switch (responseType) {
        case "json": {
            return [await response.json(), undefined];
        }
        case "blob": {
            return [await response.blob(), undefined];
        }
    }
};

export const getBlobUrlForFile = (blob: Blob) => {
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
};

export const serverFetchFile = async (path: string, thumbnail?: boolean) => {
    const cachedResult = cache.read(path);

    if (!!cachedResult) {
        return cachedResult;
    }

    const [response] = await serverWrapper(routes.file, "POST", "blob", {
        data: { path },
    });
    const url = getBlobUrlForFile(response);

    cache.write(path, url);

    let thumbnailUrl = url;

    if (isVideo(path)) {
        thumbnailUrl = await createVideoThumbnail(url);
        cache.write(`img:${path}`, thumbnailUrl);
    }

    return thumbnail ? thumbnailUrl : url;
};

export const serverAuth = async (
    type: "create" | "login",
    username: string,
    password: string
) => {
    console.log(`username:${username} password:${password}`);
    return await serverWrapper(
        type === "create" ? routes.create : routes.login,
        "POST",
        "json",
        {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${username}:${password}`
                ).toString("base64")}`,
            },
        }
    );
};

export const serverFetchDirectory = async () => {
    return await serverWrapper(routes.directory, "GET", "json");
};

export const serverRemoveItem = async (path: string, type: ItemType) => {
    await serverWrapper(routes.directory, "DELETE", "json", {
        data: { path, type },
    });
    return await serverWrapper(routes.directory);
};

export const serverAddItem = async (path: string, type: ItemType) => {
    await serverWrapper(routes.directory, "POST", "json", {
        data: { path, type },
    });
    return await serverWrapper(routes.directory);
};
