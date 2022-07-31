import { CoverImage } from "../types/CommonType";
import { fetcher } from "./fetcher";

export const getCovers = (token: string) => async (url: string) => {
  return await fetcher<CoverImage[]>(url, {
    method: "GET",
    token,
  });
};
