import { FC } from "react";
import useTranslation from 'next-translate/useTranslation'

import { formatMoney, mapApiTypeToTranslationKey } from "../../../util";
import { ExpenseType } from "../../../types/ExpenseType";

import { ExpenseIcon } from "../../atoms/ExpenseIcon/ExpenseIcon";
import { H5, Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

interface ExpenseProps {
    title: string;
    type: ExpenseType;
    value: number;
}

export const Expense: FC<ExpenseProps> = ({ title, type, value }) => {
    const { t } = useTranslation();

    const expenseType = t(mapApiTypeToTranslationKey(type));

    return (
        <div className={styles.expense}>
            <ExpenseIcon type={type} />
            <div>
                <H5>{title}</H5>
                <Text type="secondary">{expenseType}</Text>
            </div>
            <Text>{formatMoney(value)}</Text>
        </div>
    )
}