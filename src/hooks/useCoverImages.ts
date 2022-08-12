import useSWR from "swr";

import { getCovers } from "../service/coverImage";
import { getToken } from "../service/token";
import { HookApiResponse } from "../types/ApiType";
import { CoverImage } from "../types/CommonType";

export const useCoverImages = (): HookApiResponse<CoverImage[]> => {
  const token = getToken();

  const { data, error } = useSWR(!!token ? "/cover" : null, getCovers(token), {
    dedupingInterval: 30000,
  });

  return {
    data: data as CoverImage[],
    isLoading: !error && !data,
    error: error,
  };
};

export default useCoverImages;
