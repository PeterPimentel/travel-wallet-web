import { useContext } from "react";
import useSWR from "swr";
import { ROUTES } from "../constants";

import { getTravel, getTravels } from "../service/travel";
import { HookApiResponse } from "../types/ApiType";
import { Travel } from "../types/TravelType";

export const useTravels = (token: string): HookApiResponse<Travel[]> => {
  const { data, error } = useSWR(
    !!token ? "/travel" : null,
    getTravels(token),
    { dedupingInterval: 5000 }
  );

  return {
    data: data as Travel[],
    isLoading: !error && !data,
    error: error,
  };
};

export const useTravel = (
  id: number,
  token?: string
): HookApiResponse<Travel> => {
  const { data, error } = useSWR(
    !!token ? `/travel/${id}` : null,
    getTravel(token),
    { dedupingInterval: 5000 }
  );

  return {
    data: data as Travel,
    isLoading: !error && !data,
    error: error,
  };
};
