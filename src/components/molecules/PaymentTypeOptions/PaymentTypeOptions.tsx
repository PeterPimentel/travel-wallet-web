import { FC } from "react";
import useTranslation from 'next-translate/useTranslation'

import { RadioButtonOnChangeEvent } from "../../../types/CommonType";
import { PaymentType } from "../../../types/ExpenseType";
import { common } from "../../../constants/locales";

import { PaymentIcon } from "../../atoms/PaymentIcon/PaymentIcon";
import { RadioButton } from "../../atoms/RadioButton/RadioButton";
import { Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"

interface PaymentTypeOptionProps {
    text: string;
    type: PaymentType;
}

interface PaymentTypeOptionsProps {
    paymentType: PaymentType;
    onChange: (e: RadioButtonOnChangeEvent) => void;
}

const PaymentTypeOption: FC<PaymentTypeOptionProps> = ({ text, type }) => {
    return (
        <div className={styles.option}>
            <PaymentIcon type={type} />
            <Text>{text}</Text>
        </div>
    )
}

export const PaymentTypeOptions: FC<PaymentTypeOptionsProps> = ({ paymentType, onChange }) => {
    const { t } = useTranslation();

    return (
        <div>
            <RadioButton onChange={onChange} value={paymentType} options={[
                {
                    text: <PaymentTypeOption type="CASH" text={t(common.cash)} />,
                    value: "CASH"
                },
                {
                    text: <PaymentTypeOption type="CARD" text={t(common.card)} />,
                    value: "CARD"
                },
            ]} />
        </div>
    )
}