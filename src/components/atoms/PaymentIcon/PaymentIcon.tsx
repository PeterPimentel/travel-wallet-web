import { FC } from "react";
import { FaMoneyBillAlt, FaMoneyCheck } from "react-icons/fa";

import { PaymentType } from "../../../types/ExpenseType";

interface PaymentIconProps {
    type: PaymentType;
}

export const PaymentIcon: FC<PaymentIconProps> = ({ type }) => {
    switch (type) {
        case "CASH":
            return <FaMoneyBillAlt />
        case "CARD":
            return <FaMoneyCheck />
        default:
            return null
    }
}