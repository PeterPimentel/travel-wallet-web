import { EXPENSE_TYPE } from "../constants";
import { common } from "../constants/locales";
import { ExpenseType } from "../types/ExpenseType";

export const mapApiTypeToTranslationKey = (type: ExpenseType): string => {
  switch (type) {
    case EXPENSE_TYPE.food:
      return common.expense_type_food;
    case EXPENSE_TYPE.hotel:
      return common.expense_type_hotel;
    case EXPENSE_TYPE.transport:
      return common.expense_type_transport;
    case EXPENSE_TYPE.shopping:
      return common.expense_type_shopping;
    case EXPENSE_TYPE.activity:
      return common.expense_type_activity;
    default:
      return common.expense_type_other;
  }
};

export const isValidExpenseSubmit = (title: string, amount: number) => {
  if (!title || title.trim().length === 0) {
    return false;
  }

  if (!amount || amount <= 0) {
    return false;
  }

  return true;
};

export const isValidTravelSubmit = (name: string, cover: string) => {
  if (!name || name.trim().length === 0) {
    return false;
  }

  if (!cover || cover.trim().length === 0) {
    return false;
  }

  return true;
};

export const isValidSignUpSubmit = (
  type: string,
  email: string,
  password: string,
  username: string
) => {
  if (type !== "signup") {
    return false;
  }

  if (!username || username.trim().length === 0) {
    return false;
  }

  if (!email || email.trim().length === 0) {
    return false;
  }

  if (!password || password.trim().length === 0) {
    return false;
  }

  return true;
};

export const isValidSignInSubmit = (
  type: string,
  email: string,
  password: string
) => {
  if (type !== "signin") {
    return false;
  }

  if (!email || email.trim().length === 0) {
    return false;
  }

  if (!password || password.trim().length === 0) {
    return false;
  }

  return true;
};
