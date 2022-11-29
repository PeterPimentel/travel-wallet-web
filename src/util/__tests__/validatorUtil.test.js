import {
    isValidExpenseSubmit,
} from '../validatorUtil'

describe('Validator Util', () => {
    describe('isValidExpenseSubmit', () => {
        describe('invalid title', () => {
            const cases = [" ", "", undefined]
            test.each(cases)(
                "when the title provided is %p should return false",
                (title) => {
                    const result = isValidExpenseSubmit(title, 10);
                    expect(result).toEqual(false);
                }
            );
        })

        describe('invalid amount', () => {
            const cases = [0, undefined, "", -1]
            test.each(cases)(
                "when the amount provided is %p should return false",
                (amount) => {
                    const result = isValidExpenseSubmit("Title", amount);
                    expect(result).toEqual(false);
                }
            );
        })

        it('should return true when it is a valid expense', () => {
            expect(isValidExpenseSubmit("Title", 10)).toEqual(true);
        })
    })
})