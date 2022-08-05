import { Action, Thunk } from "easy-peasy";
import { Travel } from "./TravelType";

export type StoreEntities = {
  travels: Travel[];
};

export type StoreActions = {
  saveTravels: Action<StoreEntities, Travel[]>;
  fetchTravels: Thunk<StoreActions, null>;
};

export type StoreState = StoreEntities & StoreActions;
