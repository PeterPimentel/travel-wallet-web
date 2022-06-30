// import { fetcher } from "./fetcher"

const COVER_IMAGES = [
    {
        id: "city",
        name: "2016/10/24/22/43/dubai-1767540__480.jpg"
    },
    {
        id: "books",
        name: "2016/01/09/18/28/notepad-1130743_1280.jpg"
    },
    {
        id: "beach",
        name: "2017/01/20/00/30/maldives-1993704_1280.jpg"
    },
    {
        id: "airport",
        name: "2017/06/05/11/01/airport-2373727_1280.jpg"
    },
    {
        id: "bike",
        name: "2017/09/03/17/26/woman-2711279_1280.jpg",
    }
]

export const getCoverImages = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(COVER_IMAGES)
    }, 3000);
    })
}