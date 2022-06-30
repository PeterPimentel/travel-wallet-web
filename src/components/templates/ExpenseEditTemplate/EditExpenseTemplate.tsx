import { FC } from "react";

import { ExpenseRequest } from "../../../types/ApiType";

import { H3 } from "../../atoms/Typography/Typography";
import { ExpenseForm } from "../../organism/ExpenseForm/ExpenseForm";

import styles from "./style.module.css"

interface EditExpenseTemplateProps {
    headerText: string;
    expense?: ExpenseRequest;
    onSubmit: (expense: ExpenseRequest) => void
}

export const EditExpenseTemplate: FC<EditExpenseTemplateProps> = ({ headerText, expense, onSubmit }) => {

    return (
        <div className={styles.content}>
            <div className={styles.title}>
                <H3>{headerText}</H3>
            </div>
            <ExpenseForm
                initalAmount={expense?.value}
                initialDate={expense?.date}
                initialDescription={expense?.description}
                initialExpenseType={expense?.type}
                initialTitle={expense?.title}
                initialPaymentType={expense?.payment}
                onSubmit={onSubmit}
            />
        </div>
    )
}