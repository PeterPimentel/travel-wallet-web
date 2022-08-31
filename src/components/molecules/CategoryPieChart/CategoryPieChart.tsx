import { FC, useMemo } from "react";
import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'

import { Expense } from "../../../types/ExpenseType"
import { getTotalExpensesByCategory } from "../../../util/chartUtil";

const PieChart = dynamic(() => import('../../atoms/PieChart/PieChart'), {
    ssr: false,
});

interface CategoryPieChartProps {
    expenses: Expense[];
}

export const CategoryPieChart: FC<CategoryPieChartProps> = ({ expenses }) => {
    const { t } = useTranslation();

    const pie = useMemo(() => {
        const data = getTotalExpensesByCategory(expenses, true)

        return data.map(d => {
            d.label = t(d.label)
            return d
        })
    }, [expenses, t]);

    return (
        <PieChart data={pie} />
    )
}