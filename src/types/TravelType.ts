import { Expense } from "./ExpenseType";

export interface Travel {
  id: number;
  name: string;
  cover: string;
  expenses: Expense[];
  budget?: number;
}
