import { action, createStore, thunk } from "easy-peasy";

import { getToken } from "../service/token";
import { createTravel, getTravels } from "../service/travel";
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from "../service/expense";

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
    const travelIndex = state.travels.findIndex(
      (t) => t.id === payload.travelId
    );
    state.travels[travelIndex].expenses = state.travels[
      travelIndex
    ].expenses.filter((e) => e.id !== payload.id);
  }),
  updateExpense: action((state, payload) => {
    const travelIndex = state.travels.findIndex(
      (t) => t.id === payload.travelId
    );
    const expenseIndex = state.travels[travelIndex].expenses.findIndex(
      (e) => e.id === payload.id
    );
    state.travels[travelIndex].expenses[expenseIndex] = payload;
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
    const travel = await createTravel(token, {
      name: payload.name,
      cover: payload.cover,
      budget: payload.budget,
    });

    if (travel) {
      actions.saveTravel(travel);
    }
  }),
  createExpenseRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const expense = await createExpense(token, payload);

    if (expense) {
      actions.saveExpense(expense);
    }
  }),
  deleteExpenseRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const expense = await deleteExpense(token, payload);

    if (expense) {
      actions.removeExpense(expense);
    }
  }),
  updateExpenseRequest: thunk(async (actions, payload) => {
    const token = getToken();
    const expense = await updateExpense(token, payload.id, payload);

    if (expense) {
      actions.updateExpense(expense);
    }
  }),
});
