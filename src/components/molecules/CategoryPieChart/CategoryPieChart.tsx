import { FC, useMemo, useState } from "react";
import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'

import { Expense } from "../../../types/ExpenseType"
import { CHART_FILTER } from "../../../constants";
import {
    getExpensesByCategoryChartFormat,
    getExpensesByCountryChartFormat,
    getExpensesByPaymentMethodChartFormat
} from "../../../util/chartUtil";

import { ChartFilterSelect } from "../ChartFilterSelect/ChartFilterSelect";

const PieChart = dynamic(() => import('../../atoms/PieChart/PieChart'), {
    ssr: false,
});

import styles from "./style.module.css"
interface CategoryPieChartProps {
    expenses: Expense[];
}

export const CategoryPieChart: FC<CategoryPieChartProps> = ({ expenses }) => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState(CHART_FILTER.category)

    const pie = useMemo(() => {
        switch (filter) {
            case CHART_FILTER.category:
                return getExpensesByCategoryChartFormat(expenses, t)
            case CHART_FILTER.country:
                return getExpensesByCountryChartFormat(expenses)
            case CHART_FILTER.payment:
                return getExpensesByPaymentMethodChartFormat(expenses, t)
            default:
                return {
                    labels: [],
                    dataset: {
                        data: [],
                        backgroundColor: [],
                    }
                }
        }
    }, [expenses, filter, t]);

    return (
        <div className={styles.container}>
            <ChartFilterSelect value={filter} onSelect={setFilter} />
            <PieChart data={pie} title="" dataLabel="" />
        </div>
    )
}