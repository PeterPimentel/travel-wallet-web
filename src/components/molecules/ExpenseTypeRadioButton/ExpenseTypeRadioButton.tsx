import { FC } from "react";
import useTranslation from 'next-translate/useTranslation'

import { ExpenseType } from "../../../types/ExpenseType";
import { EXPENSE_TYPE } from "../../../constants";
import { common } from "../../../constants/locales";

import { ExpenseIcon } from "../../atoms/ExpenseIcon/ExpenseIcon";
import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

interface ExpenseTypeRadioButtonProps {
    value?: ExpenseType;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const expensesType = [
    {
        type: EXPENSE_TYPE.activity,
        id: "activity",
        label: common.expense_type_activity,
    },
    {
        type: EXPENSE_TYPE.food,
        id: "food",
        label: common.expense_type_food,
    },
    {
        type: EXPENSE_TYPE.hotel,
        id: "hotel",
        label: common.expense_type_hotel,
    },
    {
        type: EXPENSE_TYPE.shopping,
        id: "shopping",
        label: common.expense_type_shopping,
    },
    {
        type: EXPENSE_TYPE.transport,
        id: "transport",
        label: common.expense_type_transport,
    },
    {
        type: EXPENSE_TYPE.flight,
        id: "flight",
        label: common.expense_type_flight,
    },
    {
        type: EXPENSE_TYPE.other,
        id: "other",
        label: common.expense_type_other,
    }
]

export const ExpenseTypeRadioButton: FC<ExpenseTypeRadioButtonProps> = ({ value, onChange }) => {
    const { t } = useTranslation();


    return (
        <div className={styles.expenseTypeRadioButton}>
            {
                expensesType.map(expense => (
                    <label key={expense.id} className={styles.inputContainer} htmlFor={expense.id}>
                        <input onChange={onChange} checked={value === expense.type} className={styles.input} type="radio" id={expense.id} name="expenseType" value={expense.type} />
                        <div className={`${styles.optionButton} ${styles[expense.id]}`} id={`button-${expense.id}`}>
                            <ExpenseIcon type={expense.type as ExpenseType} />
                            <Text>{t(expense.label)}</Text>
                        </div>
                    </label>
                ))
            }
        </div>
    )
}