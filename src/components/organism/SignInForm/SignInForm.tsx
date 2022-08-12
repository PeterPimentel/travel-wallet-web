import { useCallback, useState, FC } from "react";
import { useTranslation } from "next-i18next";

import { AuthRequest } from "../../../types/ApiType";
import { getSignInURL, getSignUpURL, isValidSignInSubmit, isValidSignUpSubmit } from "../../../util";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { InputPassword } from "../../atoms/Input/InputPassword";
import { Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"
import { CommonLink } from "../../atoms/CommonLink/CommonLink";

interface FormErrors {
    email: boolean;
    username: boolean;
    password: boolean;
}

interface SignInFormProps {
    type: "signin" | "signup"
    buttonLoading: boolean;
    error?: string;
    onSubmit: (data: AuthRequest) => void
}

export const SignInForm: FC<SignInFormProps> = ({ buttonLoading, type, error, onSubmit }) => {
    // common
    const [errors, setErros] = useState<FormErrors>({
        email: false,
        username: false,
        password: false,
    })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // signup state
    const [username, setUsername] = useState("")

    const { t } = useTranslation();

    const submitLabel = type === "signup" ? "auth:sign_up" : "auth:sign_in";
    const linkLabel = type === "signup" ? "auth:already_have_account" : "auth:dont_have_account";
    const linkURL = type === "signup" ? getSignInURL() : getSignUpURL();

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (type === "signup" && (!username || username.trim().length === 0)) {
            setErros(prevErrors => ({ ...prevErrors, username: true }))
        }

        if (!email || email.trim().length === 0) {
            setErros(prevErrors => ({ ...prevErrors, email: true }))
        }

        if (!password || password.trim().length === 0) {
            setErros(prevErrors => ({ ...prevErrors, password: true }))
        }

        if (isValidSignInSubmit(type, email, password) || isValidSignUpSubmit(type, email, password, username)) {
            onSubmit({
                username,
                password,
                email
            })
        }

    }, [email, onSubmit, password, type, username])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error ? <Text type="danger">{error}</Text> : null}
            <div className={styles.inputContainer}>
                <Input
                    required
                    type="email"
                    value={email}
                    placeholder={t("auth:input_login_placeholder")}
                    onChange={(event) => {
                        setErros(prevErrors => ({ ...prevErrors, email: false }))
                        setEmail(event.target.value)
                    }}
                />
                {errors.email ? <Text type="danger">{t("auth:invalid_email")}</Text> : null}
            </div>
            {
                type === "signup" ? (
                    <div className={styles.inputContainer}>
                        <Input
                            required
                            value={username}
                            placeholder={t("auth:input_username_placeholder")}
                            onChange={(event) => {
                                setErros(prevErrors => ({ ...prevErrors, username: false }))
                                setUsername(event.target.value)
                            }}
                        />
                        {errors.username ? <Text type="danger">{t("auth:invalid_username")}</Text> : null}
                    </div>
                ) : null
            }
            <div className={styles.inputContainer}>
                <InputPassword
                    value={password}
                    placeholder={t("auth:input_password_placeholder")}
                    onChange={(event) => setPassword(event.target.value)}
                />
                {errors.password ? <Text type="danger">{t("auth:password_error")}</Text> : null}
            </div>
            <div className={styles.submitContainer}>
                <Button loading={buttonLoading} type="submit">{t(submitLabel)}</Button>
            </div>
            <div>
                <CommonLink to={linkURL}>{t(linkLabel)}</CommonLink>
            </div>
        </form>
    )
}

