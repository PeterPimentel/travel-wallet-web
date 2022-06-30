
import { DailyCost, Expense, ExpensesGroup } from "../types/ExpenseType"

export const groupExpenses = (expenses : Expense[]): ExpensesGroup => {
    return expenses.reduce((acc: ExpensesGroup, curr: Expense) => {
        if(acc[curr.date]){
            acc[curr.date].push(curr)
        }else {
            acc[curr.date] = [curr]
        }

        return acc
    }, {} as ExpensesGroup)
}

export const getTotalExpensesPeerDay = (expenses : Expense[]): DailyCost => {
    return expenses.reduce((acc: DailyCost, curr: Expense) => {
        if(acc[curr.date]){
            acc[curr.date] = acc[curr.date] + curr.value
        }else {
            acc[curr.date] = curr.value
        }

        return acc
    }, {} as DailyCost)
}

export const getDailyExpensesAverage = (expenses : Expense[]): number => {
    const totalPeerDay = getTotalExpensesPeerDay(expenses)

    const numberOfDays = Object.keys(totalPeerDay).length;
    if(!numberOfDays){
        return 0;
    }

    const total = Object.values(totalPeerDay).reduce((acc: number, curr: number) => acc + curr, 0)

    return total/numberOfDays;
}

export const getTotalExpenses = (expenses : Expense[]): number => {
    const total = expenses.reduce((acc: number, curr: Expense) => {
        return acc + curr.value
    }, 0)

    return total;
}