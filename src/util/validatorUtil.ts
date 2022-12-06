export const isValidExpenseSubmit = (title: string, amount: number) => {
    if (!title || title.trim().length === 0) {
        return false;
    }

    if (!amount || amount <= 0) {
        return false;
    }

    return true;
};

export const isValidEmail = (email: string) => {
    if (!email || email.trim().length === 0) {
        return false;
    }


    return true;
}

export const isValidCode = (code: string) => {
    if (!code || code.trim().length === 0) {
        return false;
    }

    if (code.length !== 6) {
        return false;
    }

    return true;
}

export const isValidPassword = (password: string) => {
    if (!password || password.trim().length === 0) {
        return false;
    }

    return true;
}