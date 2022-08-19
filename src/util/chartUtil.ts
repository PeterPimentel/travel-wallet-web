import { EXPENSE_COLORS, EXPENSE_TYPE } from "../constants";
import { common } from "../constants/locales";
import { PieData, BarData } from "../types/ChartType";
import { Expense } from "../types/ExpenseType";
import { formatDate } from "./dateHelper";
import { getTotalExpensesPeerDay } from "./expensesUtil";

export const getTotalExpensesByCategory = (
  expenses: Expense[],
  clean?: boolean
): PieData[] => {
  const data = expenses.reduce(
    (acc: PieData[], curr: Expense) => {
      switch (curr.type) {
        case EXPENSE_TYPE.activity:
          acc[0].y = acc[0].y + curr.value;
          return acc;
        case EXPENSE_TYPE.flight:
          acc[1].y = acc[1].y + curr.value;
          return acc;
        case EXPENSE_TYPE.food:
          acc[2].y = acc[2].y + curr.value;
          return acc;
        case EXPENSE_TYPE.hotel:
          acc[3].y = acc[3].y + curr.value;
          return acc;
        case EXPENSE_TYPE.other:
          acc[4].y = acc[4].y + curr.value;
          return acc;
        case EXPENSE_TYPE.shopping:
          acc[5].y = acc[5].y + curr.value;
          return acc;
        case EXPENSE_TYPE.transport:
          acc[6].y = acc[6].y + curr.value;
          return acc;
        default:
          return acc;
      }
    },
    [
      { x: "activity", y: 0, label: common.expense_type_activity },
      { x: "flight", y: 0, label: common.expense_type_flight },
      { x: "food", y: 0, label: common.expense_type_food },
      { x: "hotel", y: 0, label: common.expense_type_hotel },
      { x: "other", y: 0, label: common.expense_type_other },
      { x: "shopping", y: 0, label: common.expense_type_shopping },
      { x: "transport", y: 0, label: common.expense_type_transport },
    ]
  );

  if (clean) {
    return data.filter((d) => d.y > 0);
  }

  return data;
};

export const getDailyExpenses = (expenses: Expense[]): BarData[] => {
  const total = getTotalExpensesPeerDay(expenses);

  const dailyExpenses = Object.keys(total).reduce(
    (acc: BarData[], key: string) => {
      acc.push({ x: formatDate(new Date(key)), y: total[key] });

      return acc;
    },
    []
  );

  return dailyExpenses.reverse();
};

export const getPieChartColors = (data: PieData[]) => {
  return data.map((element) => EXPENSE_COLORS[element.x]);
};
