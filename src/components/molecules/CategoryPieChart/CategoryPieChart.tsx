import { FC, useMemo } from "react";
import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'

import { Expense } from "../../../types/ExpenseType"
import { getExpensesByCategoryChartFormat } from "../../../util/chartUtil";
import { overview } from "../../../constants/locales";

const PieChart = dynamic(() => import('../../atoms/PieChart/PieChart'), {
    ssr: false,
});

interface CategoryPieChartProps {
    expenses: Expense[];
}

export const CategoryPieChart: FC<CategoryPieChartProps> = ({ expenses }) => {
    const { t } = useTranslation();

    const pie = useMemo(() => {
        const data = getExpensesByCategoryChartFormat(expenses)
        const labels = data.labels.map(label => t(label))

        data.labels = labels

        return data;
    }, [expenses, t]);

    return (
        <PieChart data={pie} title={t(overview.expenses_by_category)} dataLabel="" />
    )
}