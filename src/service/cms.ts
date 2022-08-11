export const CMS_API_URL = process.env.NEXT_PUBLIC_CMS_URL;

export async function fetchResource<T>(resource: string): Promise<T> {
  const response = await fetch(`${CMS_API_URL}/items/${resource}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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

export function getAssetSrc(id: string): string {
  // return `${CMS_API_URL}/assets/${id}`;
  return "https://harthorg.sirv.com/travel-wallet/marketing_1.png";
  // return "https://harthorg.sirv.com/travel-wallet/marketing_2.png";
}
