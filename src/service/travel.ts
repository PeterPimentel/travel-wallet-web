import { Travel } from "../types/TravelType";
import { fetcher } from "./fetcher";

export const getTravels = (token: string) => async (_: string) => {
  return await fetcher<Travel[]>("/travel", {
    method: "GET",
    token,
  });
};

export const getTravel = (token: string) => async (url: string) => {
  return await fetcher<Travel>(url, {
    method: "GET",
    token,
  });
};

export const createTravel = async (token: string, travel: Partial<Travel>) => {
  return await fetcher<Travel>("/travel", {
    method: "POST",
    token,
    body: travel,
  });
};
