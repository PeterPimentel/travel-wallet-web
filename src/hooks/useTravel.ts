import { useContext } from "react"
import useSWR from "swr"

import { getTravel, getTravels } from "../service/travel"
import { HookApiResponse } from "../types/ApiType"
import { Travel } from "../types/TravelType"
import { AuthContext } from "./useAuthContext"

export const useTravels = (): HookApiResponse<Travel[]> => {
  const authContext = useContext(AuthContext);

  const { data, error } = useSWR(['/travel', authContext.authState.token], getTravels)

  return {
    data: data as Travel[],
    isLoading: !error && !data,
    error: error
  }
}

export const useTravel = (id: number): HookApiResponse<Travel> => {
  const authContext = useContext(AuthContext);
  const { data, error } = useSWR([`/travel/${id}`, authContext.authState.token], getTravel)

  return {
    data: data as Travel,
    isLoading: !error && !data,
    error: error
  }
}