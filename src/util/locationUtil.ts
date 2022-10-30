import { v4 as uuidv4 } from 'uuid';

import { SelectOption } from "../types/CommonType";
import { Location } from "../types/LocationType";
import { Travel } from '../types/TravelType';

export const addLocationIdentifier = (location: Location[]): Location[] => {
    return location.map((location) => ({
        id: uuidv4(),
        ...location,
    }))
}

export const getLocationSelectOptions = (locations: Location[]): SelectOption[] => {
    return locations.map(location => ({
        text: location.label,
        value: `${location.id}`
    }))
}

export const isSameLocation = (location1: Location, location2: Location | null): boolean => {
    const isSameCity = location1.label === location2?.label
    const isSameCountry = location1.countryCode === location2?.countryCode
    const isSameRegion = location1.region === location2?.region

    return isSameCity && isSameCountry && isSameRegion;
}

export const getUniqueLocation = (locations: Location[], value?: string): Location[] => {
    const usedLocation = locations.find(l => l.id.toString() === value);
    const initalState = usedLocation ? [usedLocation] : []

    return locations.reduce<Location[]>((acc, curr) => {
        const index = acc.findIndex(l => isSameLocation(curr, l))
        if (index === -1) {
            acc.push(curr)
        }

        return acc
    }, initalState)
}

export const getUniqueLocationOptions = (rawlocations: Location[], value?: string): SelectOption[] => {
    const locations = getUniqueLocation(rawlocations, value)

    return locations.map(location => ({
        text: location.label,
        value: `${location.id}`
    }))
}

export const getUsedLocations = (travels: Travel[], travelId: number): Location[] => {
    const travel = travels.find(tr => tr.id === travelId)
    const locations = travel.expenses.reduce<Location[]>((acc, expense) => {
        if (expense.locationId && expense.location) {
            acc.push(expense.location)
        }
        return acc
    }, [])

    return locations
}