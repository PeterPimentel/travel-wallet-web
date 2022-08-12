import useSWR from "swr";

import { ROUTES } from "../constants";
import { getToken } from "../service/token";
import { getTravel, getTravels } from "../service/travel";
import { HookApiResponse } from "../types/ApiType";
import { Travel } from "../types/TravelType";

export const useTravels = (): HookApiResponse<Travel[]> => {
  const token = getToken();

  const { data, error } = useSWR(
    !!token ? `/${ROUTES.travel}` : null,
    getTravels(token),
    { dedupingInterval: 5000 }
  );

  return {
    data: data as Travel[],
    isLoading: !error && !data,
    error: error,
  };
};

export const useTravel = (id: number): HookApiResponse<Travel> => {
  const token = getToken();

  const { data, error } = useSWR(
    !!token ? `/${ROUTES.travel}/${id}` : null,
    getTravel(token),
    { dedupingInterval: 5000 }
  );

  return {
    data: data as Travel,
    isLoading: !error && !data,
    error: error,
  };
};
