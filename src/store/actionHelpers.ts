import { Expense } from "../types/ExpenseType";
import { StoreEntities } from "../types/StoreType";
import { Travel } from "../types/TravelType";

export const updateExpenseActionHelper = (
  state: StoreEntities,
  payload: Expense
) => {
  const travelIndex = state.travels.findIndex((t) => t.id === payload.travelId);
  const expenseIndex = state.travels[travelIndex].expenses.findIndex(
    (e) => e.id === payload.id
  );
  return {
    travelIndex,
    expenseIndex,
  };
};

export const updateTravelActionHelper = (
  state: StoreEntities,
  payload: Travel
) => {
  return state.travels.map((travel) => {
    if (travel.id === payload.id) {
      return {
        ...payload,
        shared: false,
        expenses: travel.expenses,
      };
    }

    return travel;
  });
};

export const removeExpenseActionHelper = (
  state: StoreEntities,
  payload: Expense
) => {
  const travelIndex = state.travels.findIndex((t) => t.id === payload.travelId);
  const expenses = state.travels[travelIndex].expenses.filter(
    (e) => e.id !== payload.id
  );

  return {
    travelIndex,
    expenses,
  };
};
