import { FC, useCallback, useState } from "react";
import { useTranslation } from "next-i18next";

import { ExpenseRequest } from "../../../types/ApiType";
import { ExpenseType, PaymentType } from "../../../types/ExpenseType";
import { isValidExpenseSubmit } from "../../../util";
import { formatDate } from "../../../util/dateHelper";

import { Button } from "../../atoms/Button/Button";
import { DatePicker } from "../../atoms/DatePicker/DatePicker";
import { Input } from "../../atoms/Input/Input";
import { TextArea } from "../../atoms/TextArea/TextArea";
import { H5 } from "../../atoms/Typography/Typography";

import { CurrencyInput } from "../../molecules/CurrencyInput/CurrencyInput";
import { ExpenseTypeRadioButton } from "../../molecules/ExpenseTypeRadioButton/ExpenseTypeRadioButton";
import { PaymentTypeOptions } from "../../molecules/PaymentTypeOptions/PaymentTypeOptions";

import styles from "./style.module.css"

interface ExpenseFormProps {
    initalAmount?: number;
    initialDate?: string;
    initialDescription?: string;
    initialExpenseType?: ExpenseType;
    initialPaymentType?: PaymentType;
    initialTitle?: string;
    travelId?: string;
    onSubmit: (expense: ExpenseRequest) => void
}

interface ExpenseFormError {
    title: boolean;
    amount: boolean;
}

export const ExpenseForm: FC<ExpenseFormProps> = ({
    initalAmount,
    initialDate,
    initialDescription,
    initialExpenseType,
    initialPaymentType,
    initialTitle,
    onSubmit
}) => {
    const [amount, setAmount] = useState(initalAmount || 0)
    const [date, setDate] = useState(initialDate || formatDate(new Date()))
    const [description, setDescription] = useState(initialDescription || "")
    const [expenseType, setExpenseType] = useState<ExpenseType>(initialExpenseType || "FOOD")
    const [paymentType, setPaymentType] = useState<PaymentType>(initialPaymentType || "CASH")
    const [title, setTitle] = useState(initialTitle || "")
    const [error, setError] = useState<ExpenseFormError>({ title: false, amount: false })
    const { t } = useTranslation();

    const handleAmountChange = (value: number) => {
        setError(error => ({ ...error, amount: false }))
        setAmount(value)
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(error => ({ ...error, title: false }))
        setTitle(event.target.value)
    }

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!amount) {
            setError(error => ({ ...error, amount: true }))
        }
        if (!title.trim()) {
            setError(error => ({ ...error, title: true }))
        }
        if (isValidExpenseSubmit(title, amount)) {
            onSubmit({
                date: date || "",
                description: description,
                payment: paymentType,
                title: title.trim(),
                type: expenseType,
                value: amount,
            })
        }

    }, [amount, date, description, expenseType, onSubmit, paymentType, title])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <PaymentTypeOptions
                paymentType={paymentType}
                onChange={(event) => setPaymentType(event.target.value as PaymentType)}
            />
            <div className={styles.dateContainerWraper}>
                <div className={styles.dateContainer}>
                    <div>
                        <DatePicker onChange={setDate} value={date} />
                    </div>
                    <Button onClick={() => setDate(formatDate(new Date()))}>{t("today")}</Button>
                </div>
            </div>
            <div className={styles.inputContainer}>
                <Input
                    required
                    value={title}
                    error={error.title}
                    placeholder={t("input_expense_title_placeholder")}
                    onChange={handleTitleChange}
                />
            </div>
            <div className={styles.inputContainer}>
                <CurrencyInput
                    value={amount}
                    error={error.amount}
                    onchange={handleAmountChange}
                />
            </div>
            <div className={styles.inputContainer}>
                <TextArea
                    value={description}
                    placeholder={t("input_expense_description_placeholder")}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div>
                <H5>{t("category")}</H5>
                <ExpenseTypeRadioButton
                    value={expenseType}
                    onChange={(event) => setExpenseType(event.target.value as ExpenseType)}
                />
            </div>

            <div className={styles.submitContainer}>
                <Button type="submit">{t("save")}</Button>
            </div>
        </form>
    )
}

