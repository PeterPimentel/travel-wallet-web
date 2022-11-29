import {
    mapApiTypeToTranslationKey,
    isValidTravelSubmit,
    isValidSignUpSubmit,
    isValidSignInSubmit,
    sortByDate
} from '../commonUtil'

describe('commonUtil', () => {
    describe('mapApiTypeToTranslationKey', () => {
        const cases = [
            ["FOOD", "common:expense_type_food"],
            ["TRANSPORT", "common:expense_type_transport"],
            ["HOTEL", "common:expense_type_hotel"],
            ["SHOPPING", "common:expense_type_shopping"],
            ["ACTIVITY", "common:expense_type_activity"],
            ["FLIGHT", "common:expense_type_flight"],
            ["OTHER", "common:expense_type_other"],
        ]

        test.each(cases)(
            "given the expense type %p should return the translation key %p",
            (type, trabslation) => {
                const result = mapApiTypeToTranslationKey(type);
                expect(result).toEqual(trabslation);
            }
        );
    })

    describe('isValidTravelSubmit', () => {
        describe('invalid name', () => {
            const cases = [" ", "", undefined]
            test.each(cases)(
                "when the name provided is %p should return false",
                (name) => {
                    const result = isValidTravelSubmit(name, "cover");
                    expect(result).toEqual(false);
                }
            );
        })
        describe('invalid cover', () => {
            const cases = [" ", "", undefined]
            test.each(cases)(
                "when the cover provided is %p should return false",
                (cover) => {
                    const result = isValidTravelSubmit("Name", cover);
                    expect(result).toEqual(false);
                }
            );
        })

        it('should return true when it is a valid Travel', () => {
            expect(isValidTravelSubmit("Name", "cover.jpg")).toEqual(true);
        })
    })

    describe('isValidSignUpSubmit', () => {
        describe('when the type is not signup', () => {
            it('should return false', () => {
                expect(isValidSignUpSubmit("signin", "a@a.com", "password", "username")).toEqual(false);
            })
        })
        describe('when the username is not provided', () => {
            it('should return false', () => {
                expect(isValidSignUpSubmit("signup", "a@a.com", "password", " ")).toEqual(false);
            })
        })

        describe('when the email is not provided', () => {
            it('should return false', () => {
                expect(isValidSignUpSubmit("signup", " ", "password", "username")).toEqual(false);
            })
        })

        describe('when the password is not provided', () => {
            it('should return false', () => {
                expect(isValidSignUpSubmit("signup", "a@a.com", " ", "username")).toEqual(false);
            })
        })
    })

    describe('isValidSignInSubmit', () => {
        describe('when the type is not signin', () => {
            it('should return false', () => {
                expect(isValidSignInSubmit("signup", "a@a.com", "password")).toEqual(false);
            })
        })
        describe('when the password is not provided', () => {
            it('should return false', () => {
                expect(isValidSignInSubmit("signup", "a@a.com", " ")).toEqual(false);
            })
        })

        describe('when the email is not provided', () => {
            it('should return false', () => {
                expect(isValidSignInSubmit("signup", " ", "password")).toEqual(false);
            })
        })
    })
    describe('sortByDate', () => {
        describe('when the mode ASC', () => {
            it('should sort in ascending', () => {
                expect(sortByDate([
                    "2022-11-04T20:26:35.469Z",
                    "2022-11-03T20:26:35.469Z",
                    "2022-10-20T20:26:35.469Z",
                    "2022-11-04T19:26:35.469Z"
                ], "ASC")).toEqual([
                    "2022-10-20T20:26:35.469Z",
                    "2022-11-03T20:26:35.469Z",
                    "2022-11-04T19:26:35.469Z",
                    "2022-11-04T20:26:35.469Z",
                ]);
            })
        })
        describe('when the mode DESC', () => {
            it('should sort in descending', () => {
                expect(sortByDate([
                    "2022-11-04T20:26:35.469Z",
                    "2022-11-03T20:26:35.469Z",
                    "2022-10-20T20:26:35.469Z",
                    "2022-11-04T19:26:35.469Z"
                ], "DESC")).toEqual([
                    "2022-11-04T20:26:35.469Z",
                    "2022-11-04T19:26:35.469Z",
                    "2022-11-03T20:26:35.469Z",
                    "2022-10-20T20:26:35.469Z",
                ]);
            })
        })
    })
})
