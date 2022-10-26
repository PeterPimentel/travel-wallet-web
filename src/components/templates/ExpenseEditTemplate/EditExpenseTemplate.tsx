import { FC, ReactNode } from "react";

import { ExpenseRequest } from "../../../types/ApiType";

import { H3 } from "../../atoms/Typography/Typography";
import { ExpenseForm } from "../../organism/ExpenseForm/ExpenseForm";

import styles from "./style.module.css"

interface EditExpenseTemplateProps {
    headerText: string;
    expense?: ExpenseRequest;
    footer?: ReactNode;
    travelId: number;
    onSubmit: (expense: ExpenseRequest) => void
}

export const EditExpenseTemplate: FC<EditExpenseTemplateProps> = ({ headerText, travelId, expense, footer, onSubmit }) => {

    return (
        <div className={styles.content}>
            <div className={styles.title}>
                <H3>{headerText}</H3>
            </div>
            <ExpenseForm
                initalAmount={expense?.value}
                initialDate={expense?.date}
                initialDescription={expense?.description}
                initialLocation={expense?.location}
                initialExpenseType={expense?.type}
                initialTitle={expense?.title}
                initialPaymentType={expense?.payment}
                travelId={travelId}
                onSubmit={onSubmit}
            />
            {footer}
        </div>
    )
}