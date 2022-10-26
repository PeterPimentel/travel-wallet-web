import { Location, PlaceSearchParams } from "../types/LocationType";
import { fetcher } from "./fetcher";

export const getPlaces = async (token: string, search: PlaceSearchParams) => {
    return await fetcher<Location[]>("/location/place", {
        method: "POST",
        token,
        body: search,
    });
};