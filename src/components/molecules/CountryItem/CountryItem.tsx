/* eslint-disable @next/next/no-img-element */
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'

import { formatMoney, mapApiTypeToTranslationKey } from "../../../util";
import { ExpenseType } from "../../../types/ExpenseType";

import { ExpenseIcon } from "../../atoms/ExpenseIcon/ExpenseIcon";
import { H5, Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"
import { COUNTRY_FLAG_API_URL } from '../../../constants';

interface CountryItemProps {
    country: string;
    countryCode: string;
    value: number;
}

export const CountryItem = ({ country, countryCode, value }: CountryItemProps) => {
    const { t } = useTranslation();

    return (
        <li className={styles.expense}>
            {/* <img
                src={`${COUNTRY_FLAG_API_URL}${countryCode}`}
                alt="Country flag"
            /> */}
            <img src="https://flagsapi.com/ES/flat/64.png" alt="Andorra flag" />
            <div className={styles.info}>
                <H5>{country}</H5>
                <Text type="secondary">{countryCode}</Text>
            </div>
            <Text>{value}</Text>
        </li>
    )
}