import { TravelFriend } from "../types/ShareType";
import { fetcher } from "./fetcher";

export const getSharedTravelUsers = (token: string) => async (url: string) => {
    return await fetcher<TravelFriend[]>(url, {
        method: "GET",
        token,
    });
};

type SharedTravelRequest = {
    travelId: number,
    invitedUserEmail: string,
}

export const shareTravel = async (token: string, body: SharedTravelRequest) => {
    return await fetcher<TravelFriend[]>('/share', {
        method: "POST",
        token,
        body,
    });
};

export const removeSharedFriend = async (token: string, id: number) => {
    return await fetcher<TravelFriend[]>(`/share/${id}`, {
        method: "DELETE",
        token,
    });
};