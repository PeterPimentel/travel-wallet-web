import dynamic from "next/dynamic";
import useTranslation from 'next-translate/useTranslation'

import { getDailyExpenses } from "../../../../src/util/chartUtil";
import { Expense } from "../../../types/ExpenseType";
import { common, overview } from "../../../constants/locales";

const BarChart = dynamic(() => import('../../atoms/BarChart/BarChart'), {
    ssr: false,
});

interface DayliExpensesBardChartProps {
    expenses: Expense[];
}

export const DayliExpensesBardChart = ({ expenses }: DayliExpensesBardChartProps) => {
    const { t } = useTranslation();

    const data = getDailyExpenses(expenses)

    return (
        <BarChart data={data} title={t(overview.daily_expenses)} dataLabel={t(common.expenses)} />
    )
}
