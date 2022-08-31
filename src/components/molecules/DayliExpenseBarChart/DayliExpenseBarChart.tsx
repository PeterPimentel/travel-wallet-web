import dynamic from "next/dynamic";

import { getDailyExpenses } from "../../../../src/util/chartUtil";
import { Expense } from "../../../types/ExpenseType";

const BarChart = dynamic(() => import('../../atoms/BarChart/BarChart'), {
    ssr: false,
});

interface DayliExpensesBardChartProps {
    expenses: Expense[];
}

export const DayliExpensesBardChart = ({ expenses }: DayliExpensesBardChartProps) => {
    const data = getDailyExpenses(expenses)

    return (
        <BarChart data={data} />
    )
}
