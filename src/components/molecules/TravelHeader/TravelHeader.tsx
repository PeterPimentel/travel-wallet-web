import { Statistic } from "antd"
import { FC, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";

import { Expense } from "../../../types/ExpenseType";
import { getDailyExpensesAverage, getTotalExpenses } from "../../../util";

import { CommonLink } from "../../atoms/CommonLink/CommonLink";
import { SkeletonText } from "../../atoms/Skeleton/Skeleton";
import { H3 } from "../../atoms/Typography/Typography";
import { AppLogo } from "../../atoms/AppLogo/AppLogo";

import styles from "./style.module.css";

interface TravelHeaderProps {
    name: string;
    expenses: Expense[];
}

export const TravelHeader: FC<TravelHeaderProps> = ({ name, expenses }) => {
    const { t } = useTranslation();
    const router = useRouter();

    const dailyAverage = useMemo(() => getDailyExpensesAverage(expenses), [expenses]);
    const total = useMemo(() => getTotalExpenses(expenses), [expenses]);

    return (
        <header className={styles.header}>
            <div className={styles.navigationContainer}>
                <div className={styles.navigation}>
                    <FaArrowLeft color="white" />
                    <CommonLink color="white" to="/travel">{t('travels_link')}</CommonLink>
                </div>
                <AppLogo variant="white" />
                <div className={styles.actions}>
                    <CommonLink to={`/travel/edit/${router.query.id}`}>
                        <FaEdit color="white" style={{ width: '20px', height: '20px' }} />
                    </CommonLink>
                </div>
            </div>
            {!name ? <div className={styles.skeleton}><SkeletonText /> </div> : null}
            {name ? <H3>{name}</H3> : null}
            <div className={styles.expenses}>
                <Statistic title={t("daily_average_expenses")} value={dailyAverage} precision={2} />
                <Statistic title={t("total_expenses")} value={total} precision={2} />
            </div>
        </header>
    )
}