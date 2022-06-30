import { FC, useMemo } from "react";
import { useTranslation } from "next-i18next";

import { Expense } from "../../../types/ExpenseType"
import { getTotalExpensesByCategory } from "../../../util/chartUtil";

import { PieChart } from "../../atoms/PieChart/PieChart"

interface CategoryPieChartProps {
    expenses: Expense[];
}

export const CategoryPieChart: FC<CategoryPieChartProps> = ({ expenses }) => {
    const { t } = useTranslation();

    const pieData = useMemo(() => {
        const data = getTotalExpensesByCategory(expenses, true)
        const translatedDate = data.map(d => {
            d.label = `${t(d.label)}(${d.y.toFixed(2)})`
            return d
        })
        return translatedDate
    }, [expenses, t]);


    return (
        <PieChart
            data={pieData}
            colors={["#E15554", "#1098F7", "#E8C547", "#14CC60", "#E2B6CF"]}
        />
    )
}