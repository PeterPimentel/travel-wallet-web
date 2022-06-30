import { FC } from "react";

import { FaHotel, FaShoppingCart, FaBus, FaClipboardList, FaHamburger, FaRunning } from "react-icons/fa";

import { EXPENSE_TYPE } from "../../../constants";
import { ExpenseType } from "../../../types/ExpenseType";

import styles from "./style.module.css"


interface ExpenseIconProps {
    type: ExpenseType
}

export const ExpenseIcon: FC<ExpenseIconProps> = ({ type }) => {
    switch (type) {
        case EXPENSE_TYPE.food:
            return <div className={`${styles.icon} ${styles.food}`}><FaHamburger style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.hotel:
            return <div className={`${styles.icon} ${styles.hotel}`}>< FaHotel style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.transport:
            return <div className={`${styles.icon} ${styles.transport}`}>< FaBus style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.shopping:
            return <div className={`${styles.icon} ${styles.shopping}`}>< FaShoppingCart style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.activity:
            return <div className={`${styles.icon} ${styles.activity}`}>< FaRunning style={{ color: "white" }} /></div>

        default:
            return <div className={`${styles.icon} ${styles.others}`}>< FaClipboardList style={{ color: "white" }} /></div>
    }
}

