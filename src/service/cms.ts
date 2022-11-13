import { fetcher } from "./fetcher";

export async function getCMSResource<T>(url: string): Promise<T> {
  return await fetcher(`/cms/${url}`, {
    method: "GET",
    token: ""
  });
};
