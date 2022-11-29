import { Location } from "./LocationType"
export interface Expense {
    date: string;
    description?: string;
    id: number;
    title: string;
    travelId: number;
    type: ExpenseType;
    value: number;
    payment: PaymentType;
    locationId?: number;
    location?: Location;
};

export type ExpenseType = "FOOD" | "TRANSPORT" | "HOTEL" | "SHOPPING" | "ACTIVITY" | "FLIGHT"


export interface ExpensesGroup {
    [date: string]: Expense[];
}

export interface ExpenseTableData {
    type: ExpenseType;
    value: number;
    label: string;
}


export interface DailyCost {
    [date: string]: number;
}

export type PaymentType = "CARD" | "CASH";