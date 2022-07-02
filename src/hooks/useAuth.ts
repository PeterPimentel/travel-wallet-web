import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { AuthApiResponse } from "../types/ApiType";
import { recoverSession } from "../service/auth";

export default function useAuth({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: auth, mutate: mutateAuth } = useSWR<AuthApiResponse>(
    "/api/user",
    recoverSession
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !auth) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !auth.token) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && auth.token)
    ) {
      Router.push(redirectTo);
    }
  }, [auth, redirectIfFound, redirectTo]);

  return { auth, mutateAuth };
}
// Reference - https://github.com/vercel/next.js/tree/canary/examples/with-iron-session
