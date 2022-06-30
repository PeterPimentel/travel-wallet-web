import { fetcher } from "./fetcher"

import { User } from "../types/CommonType";

type AuthResponse = {
  user: User,
  token: string
} 

export const signin = async (email: string, password: string) => {
  return await fetcher<AuthResponse>("/auth/signin", {
    method: "POST",
    token: "",
    body: {email, password}
  })
};

export const signup = async (user: Partial<User>) => {
  return await fetcher<AuthResponse>("/auth/signup",{
    method: "POST", 
    token: "", 
    body: user
  })
};