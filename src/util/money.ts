import currency from "currency.js";

export const formatMoney = (value: number): string => {

    return currency(value).format();
}