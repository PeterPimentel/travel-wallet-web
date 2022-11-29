import { EXPENSE_TYPE } from "../constants";
import { common } from "../constants/locales";
import { SortMode } from "../types/CommonType";
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
    case EXPENSE_TYPE.flight:
      return common.expense_type_flight;
    default:
      return common.expense_type_other;
  }
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

export const sortByDate = (dates: string[], mode: SortMode = "ASC"): string[] => {
  const sortedDate = dates.sort((dateA: string, dateB: string) => {
    if (mode === "DESC") {
      // @ts-ignore
      return new Date(dateB) - new Date(dateA)
    } else {
      // @ts-ignore
      return new Date(dateA) - new Date(dateB)
    }
  });

  return sortedDate
}