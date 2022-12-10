import { DailyCost, Expense, ExpensesGroup } from "../types/ExpenseType";
import { Travel } from "../types/TravelType";

export const groupExpenses = (expenses: Expense[]): ExpensesGroup => {
  return expenses.reduce((acc: ExpensesGroup, curr: Expense) => {
    if (acc[curr.date]) {
      acc[curr.date].push(curr);
    } else {
      acc[curr.date] = [curr];
    }

    return acc;
  }, {} as ExpensesGroup);
};

export const getTotalExpensesPeerDay = (expenses: Expense[]): DailyCost => {
  return expenses.reduce((acc: DailyCost, curr: Expense) => {
    if (acc[curr.date]) {
      acc[curr.date] = acc[curr.date] + curr.value;
    } else {
      acc[curr.date] = curr.value;
    }

    return acc;
  }, {} as DailyCost);
};



// The key is a ExpenseType
// E.g "FOOD" | "TRANSPORT"
export const getMappedCategoryExpenses = (expenses: Expense[]) => expenses.reduce(
  (acc: Record<string, number>, curr: Expense) => {
    const storedValue = acc[curr.type];
    acc[curr.type] = storedValue ? storedValue + curr.value : curr.value;
    return acc
  },
  {}
);

// The key is the country name
// E.g "Brasil" | "Spain"
// unknow is used for expenses withou a location
export const getMappedCountryExpenses = (expenses: Expense[]) => expenses.reduce(
  (acc: Record<string, number>, curr: Expense) => {
    if (curr.location && curr.location.countryName) {
      const storedValue = acc[curr.location.countryName];
      acc[curr.location.countryName] = storedValue ? storedValue + curr.value : curr.value;
    } else {
      const storedUnknowValue = acc["unknow"];
      acc["unknow"] = storedUnknowValue ? storedUnknowValue + curr.value : curr.value;
    }
    return acc
  },
  {}
);

// The key is the payment method
// E.g "CASH" | "CARD"
export const getMappedPaymentMethodExpenses = (expenses: Expense[]) => expenses.reduce(
  (acc: Record<string, number>, curr: Expense) => {
    const storedValue = acc[curr.payment];
    acc[curr.payment] = storedValue ? storedValue + curr.value : curr.value;
    return acc
  },
  {}
);

export const getDailyExpensesAverage = (expenses: Expense[]): number => {
  const totalPeerDay = getTotalExpensesPeerDay(expenses);

  const numberOfDays = Object.keys(totalPeerDay).length;
  if (!numberOfDays) {
    return 0;
  }

  const total = Object.values(totalPeerDay).reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );

  return total / numberOfDays;
};

export const getTotalExpenses = (expenses: Expense[]): number => {
  const total = expenses.reduce((acc: number, curr: Expense) => {
    return acc + curr.value;
  }, 0);

  return total;
};

export const getSelectedTravel = (
  travels: Travel[],
  id: number,
  expenseId: number = 0
): {
  travel: Travel;
  expenses: Expense[];
  hasTravel: boolean;
  hasExpense: boolean;
} => {
  let travel: Travel;
  let expenses: Expense[];
  let hasTravel: boolean = true;
  let hasExpense: boolean = false;

  if (travels) {
    travel = travels.find((t) => t.id === id);
  } else {
    hasTravel = false;
    travel = { name: "", budget: 0, expenses: [] } as any;
  }

  if (travel) {
    expenses = travel.expenses;
  } else {
    hasTravel = false;
    expenses = [];
  }

  if (expenseId) {
    hasExpense = expenses.some((e) => e.id === expenseId);
  }

  return {
    travel,
    expenses,
    hasTravel,
    hasExpense,
  };
};
