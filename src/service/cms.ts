import { fetcher } from "./fetcher";

export function getAssetSrc(id: string): string {
  return "https://harthorg.sirv.com/travel-wallet/marketing/marketing_2.png";
}

export async function getCMSResource<T>(url: string): Promise<T> {
  return await fetcher(`/cms/${url}`, {
    method: "GET",
    token: ""
  });
};
