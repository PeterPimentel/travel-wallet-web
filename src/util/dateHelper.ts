import { format, isValid, parse, getYear, isSameYear as isSameYearBase } from "date-fns";

import { DATE_FORMAT } from "../constants";

export const formatDate = (date: Date, pattern: string = DATE_FORMAT): string => {
    return format(date, pattern)
}

export const parseDate = (value: string, pattern: string = DATE_FORMAT): Date => {
    try {
        return parse(value, pattern, new Date())
    } catch (error) {
        return new Date();
    }
}

export const isValidDate = (date: any): boolean => {
    return isValid(date)
}

export const getDateYear = (date: Date) => {
    return getYear(date)
}

export const isSameYear = (date: Date, year: string) => {
    return isSameYearBase(date, new Date(year))
}