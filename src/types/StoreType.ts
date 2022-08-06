import { Action, Thunk } from "easy-peasy";
import { Expense } from "./ExpenseType";
import { Travel } from "./TravelType";

export type StoreEntities = {
  travels: Travel[];
};

export type StoreActions = {
  saveTravels: Action<StoreEntities, Travel[]>;
  saveTravel: Action<StoreEntities, Travel>;
  saveExpense: Action<StoreEntities, Expense>;
  removeExpense: Action<StoreEntities, Expense>;
  updateExpense: Action<StoreEntities, Expense>;
  getTravelsRequest: Thunk<StoreActions, null>;
  createTravelRequest: Thunk<StoreActions, Partial<Travel>>;
  createExpenseRequest: Thunk<StoreActions, Partial<Expense>>;
  deleteExpenseRequest: Thunk<StoreActions, Partial<number>>;
  updateExpenseRequest: Thunk<StoreActions, Partial<Expense>>;
};

export type StoreState = StoreEntities & StoreActions;
