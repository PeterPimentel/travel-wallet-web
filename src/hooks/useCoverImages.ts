import useSWR from "swr";

import { getCoverImages } from "../service/coverImage";
import { HookApiResponse } from "../types/ApiType";
import { CoverImage } from "../types/CommonType";

const useCoverImages = (): HookApiResponse<CoverImage[]> => {
  const { data, error } = useSWR("/coverImages", getCoverImages);

  return {
    data: data as CoverImage[],
    isLoading: !error && !data,
    error: error,
  };
};

export default useCoverImages;
