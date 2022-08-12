import { format, isValid, parse } from "date-fns";

import { DATE_FORMAT } from "../constants";

export const formatDate = (date: Date, pattern:string = DATE_FORMAT): string => {
    return format(date, pattern)
}

export const parseDate = (value: string, pattern:string = DATE_FORMAT): Date => {
    try {
        return parse(value, pattern, new Date())
    } catch (error) {
        return new Date();
    }
}

export const isValidDate = (date: any): boolean => {
    return isValid(date)
}