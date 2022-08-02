import { FC, useMemo } from "react";
import { useTranslation } from "next-i18next";

import { Expense } from "../../../types/ExpenseType"
import { getPieChartColors, getTotalExpensesByCategory } from "../../../util/chartUtil";

import { PieChart } from "../../atoms/PieChart/PieChart"

interface CategoryPieChartProps {
    expenses: Expense[];
}

export const CategoryPieChart: FC<CategoryPieChartProps> = ({ expenses }) => {
    const { t } = useTranslation();

    const pie = useMemo(() => {
        const data = getTotalExpensesByCategory(expenses, true)
        const filteredColors = getPieChartColors(data)

        const translatedData = data.map(d => {
            d.label = `${t(d.label)}(${d.y.toFixed(2)})`
            return d
        })

        return {
            data: translatedData,
            colors: filteredColors,
        }
    }, [expenses, t]);

    return (
        <PieChart
            data={pie.data}
            colors={pie.colors}
        />
    )
}