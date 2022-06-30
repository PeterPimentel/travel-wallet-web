import { FC } from "react";

import { Expense } from "../../../types/ExpenseType";
import { formatMoney, getTotalExpenses, groupExpenses } from "../../../util"

import { CommonLink } from "../../atoms/CommonLink/CommonLink";
import { Text } from "../../atoms/Typography/Typography"

import { Expense as ExpenseComponent } from "../../molecules/Expense/Expense";

import styles from "./style.module.css"

interface ExpenseListProps {
    expenses: Expense[];
}

export const ExpenseList: FC<ExpenseListProps> = ({ expenses }) => {
    const groupedExpenses = groupExpenses(expenses);

    return (
        <div className={styles.container}>
            {
                Object.keys(groupedExpenses).map((key) => (
                    <div key={key} className={styles.expenseList}>
                        <div className={styles.header}>
                            <Text type="secondary">{key}</Text>
                            <Text>{formatMoney(getTotalExpenses(groupedExpenses[key]))}</Text>
                        </div>
                        <div className={styles.expenses}>
                            {
                                groupedExpenses[key].map(expense => (
                                    <div key={expense.id}>
                                        <CommonLink to={`expense/${expense.id}`}>
                                            <ExpenseComponent
                                                title={expense.title}
                                                type={expense.type}
                                                value={expense.value}
                                            />
                                        </CommonLink>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}