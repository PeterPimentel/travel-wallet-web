import { FC, useMemo } from "react";
import { FaUserFriends } from "react-icons/fa";

import { CDN_IMAGE_BASE_URL } from "../../../constants";
import { Expense } from "../../../types/ExpenseType";
import { getTotalExpenses, formatMoney } from "../../../util";

import { H4 } from "../../atoms/Typography/Typography";
import { Chip } from "../../molecules/Chip/Chip";

import styles from "./style.module.css";

interface TravelCardProps {
    title: string;
    cover: string;
    shared: boolean;
    expenses: Expense[];
}

export const TravelCard: FC<TravelCardProps> = ({ title, cover, shared, expenses }) => {

    const total = useMemo(() => formatMoney(getTotalExpenses(expenses)), [expenses])

    return (
        <div className={styles.card} style={{ backgroundImage: `url(${CDN_IMAGE_BASE_URL}${cover})` }}>
            {shared ? <FaUserFriends className={styles.sharedIcon} /> : null}
            <div className={styles.header}>
                <H4>{title}</H4>
                <Chip type="transparent">{total}</Chip>
            </div>
        </div>
    )
}