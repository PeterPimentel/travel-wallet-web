import { BASE_COLORS, EXPENSE_COLORS, EXPENSE_PAYMENT, EXPENSE_TYPE, MAPPED_COLORS_BY_TYPE } from "../constants";
import { common } from "../constants/locales";
import { ChartJsData } from "../types/ChartType";
import { Expense, ExpenseTableData, ExpenseType } from "../types/ExpenseType";
import { sortByDate } from "./commonUtil";
import { formatDate } from "./dateHelper";
import {
  getTotalExpensesPeerDay,
  getMappedCategoryExpenses,
  getMappedCountryExpenses,
  getMappedPaymentMethodExpenses
} from "./expensesUtil";

const MAPPED_LOCALES_BY_TYPE = {
  [EXPENSE_TYPE.activity]: common.expense_type_activity,
  [EXPENSE_TYPE.drink]: common.expense_type_drink,
  [EXPENSE_TYPE.flight]: common.expense_type_flight,
  [EXPENSE_TYPE.food]: common.expense_type_food,
  [EXPENSE_TYPE.hotel]: common.expense_type_hotel,
  [EXPENSE_TYPE.other]: common.expense_type_other,
  [EXPENSE_TYPE.shopping]: common.expense_type_shopping,
  [EXPENSE_TYPE.transport]: common.expense_type_transport,
}
const MAPPED_LOCALES_BY_PAYMENT = {
  [EXPENSE_PAYMENT.cash]: common.cash,
  [EXPENSE_PAYMENT.card]: common.card,
}

const MAPPED_COLORS_BY_PAYMENT = {
  [EXPENSE_PAYMENT.cash]: EXPENSE_COLORS.shopping,
  [EXPENSE_PAYMENT.card]: EXPENSE_COLORS.transport,
}

const COLORS = [
  EXPENSE_COLORS.shopping,
  EXPENSE_COLORS.transport,
  EXPENSE_COLORS.food,
  EXPENSE_COLORS.hotel,
  EXPENSE_COLORS.activity,
  EXPENSE_COLORS.drink,
  EXPENSE_COLORS.other,
  EXPENSE_COLORS.flight,
]

export const getExpensesByCategoryChartFormat = (
  expenses: Expense[],
  translation: (key: string) => string
): ChartJsData => {
  const mappedExpenses = getMappedCategoryExpenses(expenses)

  const chartData = Object.keys(mappedExpenses).reduce((acc: ChartJsData, key: string) => {
    acc.labels.push(translation(MAPPED_LOCALES_BY_TYPE[key]))
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

export const getExpensesByCountryChartFormat = (
  expenses: Expense[],
): ChartJsData => {
  const mappedExpenses = getMappedCountryExpenses(expenses)

  const chartData = Object.keys(mappedExpenses).reduce((acc: ChartJsData, key: string, index) => {
    acc.labels.push(key)
    acc.dataset.data.push(mappedExpenses[key])

    return acc;
  },
    {
      labels: [],
      dataset: {
        data: [],
        backgroundColor: COLORS,
      }
    })
  return chartData;
};

export const getExpensesByPaymentMethodChartFormat = (
  expenses: Expense[],
  translation: (key: string) => string
): ChartJsData => {
  const mappedExpenses = getMappedPaymentMethodExpenses(expenses)

  const chartData = Object.keys(mappedExpenses).reduce((acc: ChartJsData, key: string, index) => {
    acc.labels.push(translation(MAPPED_LOCALES_BY_PAYMENT[key]))
    acc.dataset.data.push(mappedExpenses[key])
    acc.dataset.backgroundColor.push(MAPPED_COLORS_BY_PAYMENT[key])

    return acc;
  },
    {
      labels: [],
      dataset: {
        data: [],
        backgroundColor: COLORS,
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
      value: mappedExpenses[key],
      label: MAPPED_LOCALES_BY_TYPE[key],
    }
  })

  return expensesData;
};


export const getDailyExpensesChartFormat = (
  expenses: Expense[],
): ChartJsData => {
  const total = getTotalExpensesPeerDay(expenses);
  const sortedDate = sortByDate(Object.keys(total))

  return sortedDate.reduce((acc: ChartJsData, key: string) => {
    acc.labels.push(formatDate(new Date(key), "dd/MM"))
    acc.dataset.data.push(total[key])
    acc.dataset.backgroundColor.push(BASE_COLORS.primary)

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
