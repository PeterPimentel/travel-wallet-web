import { action, actionOn, createStore, thunk } from "easy-peasy";
import { getToken } from "../service/token";
import { getTravels } from "../service/travel";
import { StoreState } from "../types/StoreType";

export const store = createStore<StoreState>({
  travels: [],
  saveTravels: action((state, payload) => {
    state.travels = payload;
  }),
  fetchTravels: thunk(async (actions, _, { getState }) => {
    const state: any = getState();

    if (!state.travels.length) {
      const token = getToken();

      const fetchTravels = getTravels(token);
      const travels = await fetchTravels("");

      actions.saveTravels(travels);
    }
  }),
});
