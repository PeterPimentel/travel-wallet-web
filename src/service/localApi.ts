import { FlagsApiResponse } from "../types/ApiType";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type Config = {
    method: HttpMethod;
    body?: any;
};

export async function localFetcher<T>(url: string, config: Config): Promise<T> {
    const response = await fetch(`/api/${url}`, {
        method: config.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: config.body ? JSON.stringify(config.body) : undefined,
    });

    if (response.ok) {
        // No Content
        if (response.status === 204) {
            return null
        }

        return response.json();
    } else {
        if (response.status === 404) {
            throw new Error("Service Unavailable");
        }

        const error = await response.json();
        if (error.message) {
            throw error;
        } else {
            throw new Error("Service Unavailable");
        }
    }
}


export const getFlags = async (codes: string[]) => {
    return await localFetcher<FlagsApiResponse>('flags', {
        method: "POST",
        body: { countries: codes },
    });
};
