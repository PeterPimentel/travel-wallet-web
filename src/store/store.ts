import { action, createStore, thunk } from "easy-peasy";

import { getToken } from "../service/token";
import {
  createTravel,
  getTravels,
  updateTravel,
  deleteTravel,
} from "../service/travel";
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from "../service/expense";
import {
  removeExpenseActionHelper,
  updateExpenseActionHelper,
  updateTravelActionHelper,
} from "./actionHelpers";

import { StoreState } from "../types/StoreType";

export const store = createStore<StoreState>({
  travels: [],
  saveTravels: action((state, payload) => {
    state.travels = payload;
  }),
  saveTravel: action((state, payload) => {
    payload.expenses = [];
    state.travels.unshift(payload);
  }),
  saveExpense: action((state, payload) => {
    const travelIndex = state.travels.findIndex(
      (t) => t.id === payload.travelId
    );
    state.travels[travelIndex].expenses.unshift(payload);
  }),
  removeExpense: action((state, payload) => {
    const data = removeExpenseActionHelper(state, payload);
    state.travels[data.travelIndex].expenses = data.expenses;
  }),
  updateExpense: action((state, payload) => {
    const index = updateExpenseActionHelper(state, payload);
    state.travels[index.travelIndex].expenses[index.expenseIndex] = payload;
  }),
  removeTravel: action((state, payload) => {
    state.travels = state.travels.filter((t) => t.id !== payload.id);
  }),
  updateTravel: action((state, payload) => {
    state.travels = updateTravelActionHelper(state, payload);
  }),
  getTravelsRequest: thunk(async (actions, _, { getState }) => {
    const state: any = getState();

    if (!state.travels.length) {
      const token = getToken();
      const fetchTravels = getTravels(token);
      const travels = await fetchTravels("");

      actions.saveTravels(travels);
    }
  }),
  createTravelRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const travel = await createTravel(token, payload);

    actions.saveTravel(travel);
  }),
  createExpenseRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const expense = await createExpense(token, payload);

    actions.saveExpense(expense);
  }),
  deleteExpenseRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const expense = await deleteExpense(token, payload);

    actions.removeExpense(expense);
  }),
  updateExpenseRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const expense = await updateExpense(token, payload.id, payload);

    actions.updateExpense(expense);
  }),
  deleteTravelRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const travel = await deleteTravel(token, payload);

    actions.removeTravel(travel);
  }),
  updateTravelRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const travel = await updateTravel(token, payload.id, payload);

    actions.updateTravel(travel);
  }),
});
