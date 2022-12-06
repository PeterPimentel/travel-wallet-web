import { apiLocales, apiLocalesMap } from "../constants/apiLocales";
import { common } from "../constants/locales";
import { APIError } from "../types/ApiType";

export const getErrorTranslateKey = (error?: APIError) => {
    if (!error) {
        return common.unexpected_error
    }

    if (error.code && apiLocales.includes(error.code)) {
        return apiLocalesMap[error.code]
    }

    if (error.message) {
        return error.message
    }
}