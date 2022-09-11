import { FC, useMemo } from "react";
import useTranslation from 'next-translate/useTranslation'

import { Expense } from "../../../types/ExpenseType"
import { formatMoney, getExpensesByCategory } from "../../../util";

import { ExpenseIcon } from "../../atoms/ExpenseIcon/ExpenseIcon";
import { Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"


interface ExpensesCategoryListProps {
    expenses: Expense[];
}

export const ExpensesCategoryList: FC<ExpensesCategoryListProps> = ({ expenses }) => {
    const { t } = useTranslation();

    const translatedExpenses = useMemo(() => {
        return getExpensesByCategory(expenses).map((data) => ({ ...data, label: t(data.label) }))
    }, [expenses, t]);

    return (
        <ul className={styles.list}>
            {translatedExpenses.map(expense => (
                <li key={expense.type} className={styles.expense}>
                    <div className={styles.category}>
                        <ExpenseIcon type={expense.type} />
                        <Text>{expense.label}</Text>
                    </div>
                    <Text>{formatMoney(expense.value)}</Text>
                </li>
            ))}
        </ul>
    )
}