import { Statistic } from "antd"
import { useMemo } from "react";
import useTranslation from 'next-translate/useTranslation'
import { FaArrowLeft, FaEdit, FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";

import { Expense } from "../../../types/ExpenseType";
import { formatMoney, getDailyExpensesAverage, getTotalExpenses, getTravelEditURL, getTravelShareURL, getTravelsURL } from "../../../util";
import { common } from "../../../constants/locales";

import { CommonLink } from "../../atoms/CommonLink/CommonLink";
import { SkeletonText } from "../../atoms/Skeleton/Skeleton";
import { H5, Text } from "../../atoms/Typography/Typography";
import { AppLogo } from "../../atoms/AppLogo/AppLogo";
import { BalanceProgress } from "../BalanceProgress/BalanceProgress";

import styles from "./style.module.css";

interface TravelHeaderProps {
    budget: number;
    name: string;
    shared: boolean;
    expenses: Expense[];
}

export const TravelHeader = ({ budget, name, shared, expenses }: TravelHeaderProps) => {
    const { t } = useTranslation();
    const router = useRouter();

    const dailyAverage = useMemo(() => getDailyExpensesAverage(expenses), [expenses]);
    const total = useMemo(() => getTotalExpenses(expenses), [expenses]);
    const balance = budget ? budget - total : 0;
    const balancePercent = budget ? (total / budget) * 100 : 0

    return (
        <header className={styles.header}>
            <div className={styles.navigationContainer}>
                <div className={styles.navigation}>
                    <FaArrowLeft color="white" />
                    <CommonLink color="white" to={getTravelsURL()}>{t(common.travels_link)}</CommonLink>
                </div>
                <AppLogo variant="white" />
                {shared === false ? <div className={styles.actions}>
                    <CommonLink to={getTravelShareURL(router.query.id as string)}>
                        <FaUserFriends className={styles.actionIcon} />
                    </CommonLink>
                    <CommonLink to={getTravelEditURL(router.query.id as string)}>
                        <FaEdit className={styles.actionIcon} />
                    </CommonLink>
                </div> : null}
            </div>
            {!name ? <div className={styles.skeleton}><SkeletonText /> </div> : null}
            {name ? <H5>{name}</H5> : null}
            <div className={styles.expenses}>
                <Statistic title={t(common.daily_average_expenses)} value={dailyAverage} precision={2} />
                <div>
                    <Statistic title={t(common.total_expenses)} value={total} precision={2} />
                    {budget ? (
                        <div>
                            <BalanceProgress percent={balancePercent} />
                            <div className={styles.balance} >
                                <Text type="secondary">{t(common.balance)}</Text>
                                <Text type="secondary">{formatMoney(balance)}</Text>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </header>
    )
}