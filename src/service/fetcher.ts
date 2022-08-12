const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type Config = {
  method: HttpMethod;
  token: string;
  body?: any;
};

export async function fetcher<T>(url: string, config: Config): Promise<T> {
  const response = await fetch(`${BASE_API_URL}${url}`, {
    method: config.method,
    headers: {
      "Content-Type": "application/json",
      authorization: config.token ? `Bearer ${config.token}` : "",
    },
    referrerPolicy: "no-referrer-when-downgrade",
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  if (response.ok) {
    return response.json();
  } else {
    const error = await response.json();
    if (error.message) {
      throw error;
    } else {
      throw new Error("Service Unavailable");
    }
  }
}
