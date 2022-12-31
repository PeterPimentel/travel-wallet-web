import useSWR from "swr";

import { getSharedTravelUsers } from "../service/shareTravel";
import { getToken } from "../service/token";
import { HookApiResponse } from "../types/ApiType";
import { TravelFriend } from "../types/ShareType";

type HookApiResponseWithMutate = HookApiResponse<TravelFriend[]> & {
  mutate: () => void
}

export const useSharedTravelUsers = (travelId: number): HookApiResponseWithMutate => {
  const token = getToken();

  const { data, error, mutate } = useSWR(!!token ? `/share/${travelId}/user` : null, getSharedTravelUsers(token), {
    dedupingInterval: 30000,
  });

  return {
    data: data as TravelFriend[],
    isLoading: !error && !data,
    error: error,
    mutate,
  };
};

export default useSharedTravelUsers;
