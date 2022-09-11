import { EXPENSE_TYPE, MAPPED_COLORS_BY_TYPE } from "../constants";
import { common } from "../constants/locales";
import { ChartJsData } from "../types/ChartType";
import { Expense, ExpenseTableData, ExpenseType } from "../types/ExpenseType";
import { formatDate } from "./dateHelper";
import { getTotalExpensesPeerDay, getMappedCategoryExpenses } from "./expensesUtil";

const MAPPED_LOCALES_BY_TYPE = {
  [EXPENSE_TYPE.activity]: common.expense_type_activity,
  [EXPENSE_TYPE.flight]: common.expense_type_flight,
  [EXPENSE_TYPE.food]: common.expense_type_food,
  [EXPENSE_TYPE.hotel]: common.expense_type_hotel,
  [EXPENSE_TYPE.other]: common.expense_type_other,
  [EXPENSE_TYPE.shopping]: common.expense_type_shopping,
  [EXPENSE_TYPE.transport]: common.expense_type_transport,
}

export const getExpensesByCategoryChartFormat = (
  expenses: Expense[],
): ChartJsData => {
  const mappedExpenses = getMappedCategoryExpenses(expenses)

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

export const getExpensesByCategory = (
  expenses: Expense[],
): ExpenseTableData[] => {
  const mappedExpenses = getMappedCategoryExpenses(expenses)
  const expensesData = Object.keys(mappedExpenses).map((key: ExpenseType) => {
    return {
      type: key,
      value:  mappedExpenses[key],
      label: MAPPED_LOCALES_BY_TYPE[key],
    }
  })

  return expensesData;
};


export const getDailyExpensesChartFormat = (
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
