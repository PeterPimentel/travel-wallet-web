import { fetcher } from "./fetcher";
import { User } from "../types/CommonType";
import { AuthApiResponse } from "../types/ApiType";

export const signin = async (email: string, password: string) => {
  return await fetcher<AuthApiResponse>("/auth/signin", {
    method: "POST",
    token: "",
    body: { email, password },
  });
};

export const signup = async (user: Partial<User>) => {
  return await fetcher<AuthApiResponse>("/auth/signup", {
    method: "POST",
    token: "",
    body: user,
  });
};

export const getSession = (token: string) => async (_: string) => {
  return await fetcher<AuthApiResponse>("/auth/session", {
    method: "GET",
    token,
  });
};
// export const getSession = async (token: string) => {
//   return await fetcher<AuthApiResponse>("/auth/session", {
//     method: "GET",
//     token,
//   });
// };
