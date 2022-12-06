import { fetcher } from "./fetcher";

export const resetRequest = async (email: string) => {
    return await fetcher<void>(`/auth/password/reset`, {
        method: "POST",
        token: '',
        body: {
            email,
        }
    });
};

export const resetPassword = async (email: string, code: string, password: string) => {
    return await fetcher<void>(`/auth/password/reset`, {
        method: "PUT",
        token: '',
        body: {
            email,
            code,
            password
        }
    });
};
