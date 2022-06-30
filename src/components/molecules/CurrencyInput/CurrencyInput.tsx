import { InputNumber } from "antd";
import { FC } from "react";

import styles from "./style.module.css"

const locale = "en-us";

const currencyFormatter = (selectedCurrOpt: string) => (value: any) => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: selectedCurrOpt
    }).format(value);
};

const currencyParser = (val?: string) => {
    try {
        if (!val) {
            return "0.0"
        }

        // for when the input gets clears
        if (typeof val === "string" && !val.length) {
            val = "0.0";
        }

        // detecting and parsing between comma and dot
        const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
        const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
        let reversedVal: any = val.replace(new RegExp("\\" + group, "g"), "");
        reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
        //  => 1232.21 €

        // removing everything except the digits and dot
        reversedVal = reversedVal.replace(/[^0-9.]/g, "");
        //  => 1232.21

        // appending digits properly
        const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
        const needsDigitsAppended = digitsAfterDecimalCount > 2;

        if (needsDigitsAppended) {
            reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
        }

        return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
        console.error(error);
    }
};


interface CurrencyInputProps {
    value: number;
    onchange: (value: number) => void;
    error?: boolean;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({ value, error = false, onchange }) => {
    return (
        <InputNumber
            status={error ? "error" : undefined}
            className={styles.input}
            value={value}
            size="large"
            onChange={onchange}
            formatter={currencyFormatter("USD")}
            parser={currencyParser}
        />
    );
};

