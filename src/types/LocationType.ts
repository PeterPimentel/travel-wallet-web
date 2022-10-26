export interface Location {
    id: number,
    countryCode: string,
    countryName: string,
    cityName: string,
    label: string,
    region: string,
    cityLat: number,
    cityLong: number,
}

export interface PlaceSearchParams {
    query: string,
}