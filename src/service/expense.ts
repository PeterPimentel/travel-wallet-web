import { Expense } from "../types/ExpenseType";
import { Travel } from "../types/TravelType";
import { fetcher } from "./fetcher";

export const createExpense = async (
  token: string,
  expense: Partial<Expense>
) => {
  return await fetcher<Expense>("/expense", {
    method: "POST",
    token,
    body: expense,
  });
};

export const updateExpense = async (
  token: string,
  id: number,
  expense: Partial<Expense>
) => {
  return await fetcher<Expense>(`/expense/${id}`, {
    method: "PUT",
    token,
    body: expense,
  });
};

export const deleteExpense = async (token: string, id: number) => {
  return await fetcher<Expense>(`/expense/${id}`, {
    method: "DELETE",
    token,
  });
};
