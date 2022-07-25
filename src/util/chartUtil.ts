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
        case "FOOD":
          acc[0].y = acc[0].y + curr.value;
          return acc;
        case "TRANSPORT":
          acc[1].y = acc[1].y + curr.value;
          return acc;
        case "HOTEL":
          acc[2].y = acc[2].y + curr.value;
          return acc;
        case "SHOPPING":
          acc[3].y = acc[3].y + curr.value;
          return acc;
        case "ACTIVITY":
          acc[4].y = acc[4].y + curr.value;
          return acc;
        default:
          return acc;
      }
    },
    [
      { x: 1, y: 0, label: "expense_type_food" },
      { x: 2, y: 0, label: "expense_type_transport" },
      { x: 3, y: 0, label: "expense_type_hotel" },
      { x: 4, y: 0, label: "expense_type_shopping" },
      { x: 5, y: 0, label: "expense_type_activity" },
      { x: 6, y: 0, label: "expense_type_other" },
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
