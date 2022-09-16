import { fetcher } from "./fetcher";
import { AuthApiResponse } from "../types/ApiType";

export const remove = async (token: string) => {
  return await fetcher<AuthApiResponse>("/user", {
    method: "DELETE",
    token,
  });
};
