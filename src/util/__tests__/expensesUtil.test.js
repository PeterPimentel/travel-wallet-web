import { groupExpenses, getTotalExpensesPeerDay } from "../expensesUtil"

const EXPENSE_A = {
    date: '20-03-2021',
    title: 'EXPENSE_A',
    value: 20,
}
const EXPENSE_B = {
    date: '20-03-2021',
    title: 'EXPENSE_B',
    value: 1.50,
}
const EXPENSE_C = {
    date: '21-03-2021',
    title: 'EXPENSE_C',
    value: 15,
}
const EXPENSE_D = {
    date: '30-04-2021',
    title: 'EXPENSE_D',
    value: 200,
}

const EXPENSES_MOCK = [EXPENSE_A, EXPENSE_B, EXPENSE_C, EXPENSE_D]

describe('expensesUtil', () => {
    describe('groupExpenses', () => {
        it('should return the expenses grouped by date', () => {
            const group = groupExpenses(EXPENSES_MOCK)

            expect(group['20-03-2021'].length).toEqual(2)
            expect(group['21-03-2021'].length).toEqual(1)
            expect(group['30-04-2021'].length).toEqual(1)
        })

        it('should contain the whole expense data', () => {
            const group = groupExpenses(EXPENSES_MOCK)

            expect(group['20-03-2021'][0]).toEqual(EXPENSE_A)
        })
    });

    describe('getTotalExpensesPeerDay', () => {
        it('should return the expenses total grouped by date', () => {
            const total = getTotalExpensesPeerDay(EXPENSES_MOCK)

            expect(total['20-03-2021']).toEqual(21.50)
            expect(total['21-03-2021']).toEqual(15)
            expect(total['30-04-2021']).toEqual(200)
        })
    })
})