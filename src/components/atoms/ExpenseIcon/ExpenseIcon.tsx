import {
    FaHotel,
    FaShoppingBag,
    FaBus,
    FaShapes,
    FaHamburger,
    FaTheaterMasks,
    FaPlaneDeparture,
    FaWineGlassAlt
} from "react-icons/fa";

import { EXPENSE_TYPE } from "../../../constants";
import { ExpenseType } from "../../../types/ExpenseType";

import styles from "./style.module.css"

interface ExpenseIconProps {
    type: ExpenseType
}

export const ExpenseIcon = ({ type }: ExpenseIconProps) => {
    switch (type) {
        case EXPENSE_TYPE.food:
            return <div className={`${styles.icon} ${styles.food}`}><FaHamburger style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.hotel:
            return <div className={`${styles.icon} ${styles.hotel}`}>< FaHotel style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.transport:
            return <div className={`${styles.icon} ${styles.transport}`}>< FaBus style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.shopping:
            return <div className={`${styles.icon} ${styles.shopping}`}>< FaShoppingBag style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.activity:
            return <div className={`${styles.icon} ${styles.activity}`}>< FaTheaterMasks style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.flight:
            return <div className={`${styles.icon} ${styles.flight}`}>< FaPlaneDeparture style={{ color: "white" }} /></div>

        case EXPENSE_TYPE.drink:
            return <div className={`${styles.icon} ${styles.drink}`}>< FaWineGlassAlt style={{ color: "white" }} /></div>

        default:
            return <div className={`${styles.icon} ${styles.other}`}>< FaShapes style={{ color: "white" }} /></div>
    }
}

