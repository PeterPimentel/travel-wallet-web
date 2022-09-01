import { EXPENSE_TYPE, MAPPED_COLORS_BY_TYPE } from "../constants";
import { common } from "../constants/locales";
import { ChartJsData } from "../types/ChartType";
import { Expense } from "../types/ExpenseType";
import { formatDate } from "./dateHelper";
import { getTotalExpensesPeerDay } from "./expensesUtil";

const MAPPED_LOCALES_BY_TYPE = {
  [EXPENSE_TYPE.activity]: common.expense_type_activity,
  [EXPENSE_TYPE.flight]: common.expense_type_flight,
  [EXPENSE_TYPE.food]: common.expense_type_food,
  [EXPENSE_TYPE.hotel]: common.expense_type_hotel,
  [EXPENSE_TYPE.other]: common.expense_type_other,
  [EXPENSE_TYPE.shopping]: common.expense_type_shopping,
  [EXPENSE_TYPE.transport]: common.expense_type_transport,
}

export const getTotalExpensesByCategory = (
  expenses: Expense[],
): ChartJsData => {
  const mappedExpenses = expenses.reduce(
    (acc: Record<string, number>, curr: Expense) => {
      const storedValue = acc[curr.type];
      acc[curr.type] = storedValue ? storedValue + curr.value : curr.value;
      return acc
    },
    {}
  );

  const chartData = Object.keys(mappedExpenses).reduce((acc: ChartJsData, key: string) => {
    acc.labels.push(MAPPED_LOCALES_BY_TYPE[key])
    acc.dataset.data.push(mappedExpenses[key])
    acc.dataset.backgroundColor.push(MAPPED_COLORS_BY_TYPE[key])
  
    return acc;  
  },
    {
      labels: [],
      dataset: {
        data: [],
        backgroundColor: [],
      }
    })

  return chartData;
};

export const getDailyExpenses = (
  expenses: Expense[],
): ChartJsData => {
  const total = getTotalExpensesPeerDay(expenses);

  return Object.keys(total).reduce((acc: ChartJsData, key: string) => {
    acc.labels.push(formatDate(new Date(key), "dd/MM"))

    acc.dataset.data.push(total[key])
    acc.dataset.backgroundColor.push("#5377F0")

    return acc;
  },
    {
      labels: [],
      dataset: {
        data: [],
        backgroundColor: [],
      }
    }
  );
};
