import { EXPENSE_TYPE } from "../constants";
import { DailyCost, Expense, ExpensesGroup, FavoriteLocation } from "../types/ExpenseType";
import { Travel } from "../types/TravelType";
import { getUnique, sortByDate } from "./commonUtil";
import { formatDate, getDateYear, isSameYear, isValidDate } from "./dateHelper";

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
// unknow is used for expenses without a location
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

const groupByCity = (expenses: Expense[]) => expenses.reduce(
  (acc: ExpensesGroup, curr: Expense) => {
    if (curr.location && curr.location.cityName && curr.location.label) {
      const storedValue = acc[curr.location.label];
      acc[curr.location.label] = storedValue ? acc[curr.location.label].concat(curr) : [curr]
    }
    return acc
  },
  {}
);

type MapData = {
  label: string;
  value: number;
  startDate: string;
  endDate: string;
  days: number;
  lat: number;
  long: number;
  country: string;
  countryCode: string;
}
// The key is the city label
// E.g "Salvador, Bahia, Brasil" | "Porto, Portugal"
// To avoid store different cities in the same group
// The expenses without place will not be listed
export const getMapData = (expenses: Expense[]): MapData[] => {
  const group = groupByCity(expenses);

  return Object.keys(group).reduce((acc, key) => {
    const dates = group[key].map(d => d.date)
    const sortedDates = sortByDate(dates, "ASC")
    const uniqueDates = getUnique(dates);
    const total = group[key].reduce((value, curr) => curr.value + value, 0)

    const startDate = isValidDate(new Date(sortedDates[0])) ? formatDate(new Date(sortedDates[0])) : '';
    const endDate = isValidDate(new Date(sortedDates[sortedDates.length - 1])) ? formatDate(new Date(sortedDates[sortedDates.length - 1])) : '';
    const latitude = group[key][0]?.location.cityLat || 0
    const longitude = group[key][0]?.location.cityLong || 0
    const country = group[key][0]?.location.countryName || ""
    const countryCode = group[key][0]?.location.countryCode || ""

    return acc.concat({
      label: key,
      value: total,
      startDate: startDate,
      endDate: endDate,
      days: uniqueDates.length,
      lat: latitude,
      long: longitude,
      country: country,
      countryCode: countryCode,
    })
  }, [])
}

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

export const getAllExpenses = (travels: Travel[], filter: string): Expense[] => {
  const expenses = travels.reduce((acc: Expense[], curr) => {
    return acc.concat(curr.expenses)
  }, [])

  if (filter === "ALL") {
    return expenses
  } else {
    return expenses.filter(exp => isSameYear(new Date(exp.date), filter))
  }
}

export const getFlightExpenses = (expenses: Expense[]): Expense[] => {
  return expenses.filter(expense => expense.type === EXPENSE_TYPE.flight)
}

export const getMostVistedCity = (data: MapData[]): FavoriteLocation => {
  return data.reduce((acc, curr) => {
    if (acc.days < curr.days) {
      acc = {
        days: curr.days,
        name: curr.label
      }
    }
    return acc;
  }, {
    days: 0,
    name: ""
  })
}

type CountryData = {
  code: string;
  name: string;
  cities: string[];
}
export const getVistedCountries = (data: MapData[]): CountryData[] => {
  const rawCountries = data.reduce((acc, curr) => {
    acc[curr.country] = {
      country: curr.country,
      code: curr.countryCode,
      cities: acc[curr.country] ? acc[curr.country].cities.concat(curr.label) : [curr.label]
    }
    return acc;
  }, {})
  const sorted = Object.keys(rawCountries).sort((a, b) => {
    return rawCountries[b].cities.length - rawCountries[a].cities.length
  })

  return sorted.map(country => rawCountries[country]);
}


// Probably we will have to change it to be based on the number of cities visited
// Because we group the expenses based on city name
// So if we spent 20 days in Ibiza it will show only one entry
// The only way to get the country were we spent more days
// is get the days of the cities visited and calculate it based on the country
// but it is interesting the idea to see the country were you have more visited cities
// export const getCountryCities = (data: MapData[]) => {
//   const mappedData = data.reduce((acc, curr) => {
//     if (acc[curr.country]) {
//       acc[curr.country].push(curr.label)
//     } else {
//       acc[curr.country] = [curr.label]
//     }
//     return acc
//   }, {})

//   const sorted = Object.keys(mappedData).sort((a, b) => mappedData[b].length - mappedData[a].length)

//   return sorted.map(country => ({
//     label: country,
//     cities: mappedData[country]
//   }))
// }


export const getExpensesYears = (expenses: Expense[]) => {
  const rawYears = expenses.reduce((acc: string[], curr: Expense) => {
    acc.push(`${getDateYear(new Date(curr.date))}`)
    return acc;
  }, []);

  const sorted = getUnique(rawYears).sort()
  return sorted.map(year => ({
    value: year,
    text: year
  }))
};