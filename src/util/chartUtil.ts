import { EXPENSE_COLORS, EXPENSE_TYPE } from "../constants";
import { common } from "../constants/locales";
import { ChartData } from "../types/ChartType";
import { Expense } from "../types/ExpenseType";
import { formatDate } from "./dateHelper";
import { getTotalExpensesPeerDay } from "./expensesUtil";

export const getTotalExpensesByCategory = (
  expenses: Expense[],
  clean?: boolean
): ChartData[] => {
  const data = expenses.reduce(
    (acc: ChartData[], curr: Expense) => {
      switch (curr.type) {
        case EXPENSE_TYPE.activity:
          acc[0].value = acc[0].value + curr.value;
          return acc;
        case EXPENSE_TYPE.flight:
          acc[1].value = acc[1].value + curr.value;
          return acc;
        case EXPENSE_TYPE.food:
          acc[2].value = acc[2].value + curr.value;
          return acc;
        case EXPENSE_TYPE.hotel:
          acc[3].value = acc[3].value + curr.value;
          return acc;
        case EXPENSE_TYPE.other:
          acc[4].value = acc[4].value + curr.value;
          return acc;
        case EXPENSE_TYPE.shopping:
          acc[5].value = acc[5].value + curr.value;
          return acc;
        case EXPENSE_TYPE.transport:
          acc[6].value = acc[6].value + curr.value;
          return acc;
        default:
          return acc;
      }
    },
    [
      { id: "activity", value: 0, label: common.expense_type_activity, color:EXPENSE_COLORS.activity },
      { id: "flight", value: 0, label: common.expense_type_flight, color:EXPENSE_COLORS.flight },
      { id: "food", value: 0, label: common.expense_type_food, color:EXPENSE_COLORS.food },
      { id: "hotel", value: 0, label: common.expense_type_hotel, color:EXPENSE_COLORS.hotel },
      { id: "other", value: 0, label: common.expense_type_other, color:EXPENSE_COLORS.other },
      { id: "shopping", value: 0, label: common.expense_type_shopping, color:EXPENSE_COLORS.shopping },
      { id: "transport", value: 0, label: common.expense_type_transport, color:EXPENSE_COLORS.transport },
    ]
  );

  if (clean) {
    return data.filter((d) => d.value > 0);
  }

  return data;
};

export const getDailyExpenses = (
  expenses: Expense[],
): ChartData[] => {
  const total = getTotalExpensesPeerDay(expenses);

  return Object.keys(total).reduce(
    (acc: ChartData[], key: string) => {
      const date = formatDate(new Date(key), "dd/MM")
      acc.push({
        color: "#5377F0",
        id: date,
        label: date,
        value: total[key]
      });
      return acc;
    },
    []
  );
};