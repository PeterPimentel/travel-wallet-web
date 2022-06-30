import { Travel } from "../types/TravelType"
import { fetcher } from "./fetcher"

export const getTravels = async (_:string, token: string) => {
    return await fetcher<Travel[]>("/travel", {
        method: "GET",
        token,
    })
}

export const getTravel = async (url: string, token: string) => {
    return await fetcher<Travel>(url, {
        method: "GET",
        token,
    })
}