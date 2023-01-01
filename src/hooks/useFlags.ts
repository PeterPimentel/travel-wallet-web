import useSWR from "swr";

import { getFlags } from "../service/localApi";
import { HookApiResponse } from "../types/ApiType";
import { Flag } from "../types/CommonType";

export const useFlags = (codes: string[]): HookApiResponse<Flag[]> => {

    const { data, error } = useSWR(["/flags", JSON.stringify(codes)], () => getFlags(codes), {
        dedupingInterval: 30000,
    });

    return {
        data: data as Flag[],
        isLoading: !error && !data,
        error: error,
    };
};

export default useFlags;
