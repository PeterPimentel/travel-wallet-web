import { Flag, User } from "./CommonType";
import { Expense } from "./ExpenseType";
import { Travel } from "./TravelType";

export type ExpenseRequest = Partial<Expense>
export type TravelRequest = Partial<Travel>
export type AuthRequest = Partial<User> & {
    email: string;
    password: string;
    username?: string
}

export interface HookApiResponse<T> {
    data: T;
    isLoading: boolean;
    error: any
}

export type APIError = {
    status: number;
    message: string;
    code: string;
}

export type AuthApiResponse = {
    user: User,
    token: string,
}

export type FlagsApiResponse = Flag[];