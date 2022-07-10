export interface Expense {
    date: string;
    description?: string;
    id: number;
    title: string;
    travelId: number;
    type: ExpenseType;
    value: number;
    payment: PaymentType;
};

export type ExpenseType = "FOOD" | "TRANSPORT" | "HOTEL" | "SHOPPING" |"ACTIVITY"


export interface ExpensesGroup {
    [date: string]: Expense[];
}

export interface DailyCost {
    [date: string]: number;
}

export type PaymentType = "CARD" | "CASH";