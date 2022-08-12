import { useEffect, useState } from "react";
import useSWR from "swr";

import { getSession } from "../service/auth";
import { getToken } from "../service/token";
import { AuthApiResponse, HookApiResponse } from "../types/ApiType";
import { AppSession } from "../types/CommonType";

const useSession = (): HookApiResponse<AppSession> => {
  const token = getToken();
  const { data, error } = useSWR<AuthApiResponse>(
    "/auth/session",
    getSession(token),
    {
      dedupingInterval: 15000,
    }
  );

  return {
    data: data?.user,
    error,
    isLoading: !error && !data,
  };
};

export default useSession;
