export const isValidExpenseSubmit = (title: string, amount: number) => {
    if (!title || title.trim().length === 0) {
        return false;
    }

    if (!amount || amount <= 0) {
        return false;
    }

    return true;
};