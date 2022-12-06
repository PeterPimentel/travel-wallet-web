import useTranslation from "next-translate/useTranslation";
import { useCallback, useState } from "react";

import { request } from "../../../constants/locales";
import { resetPassword } from "../../../service/passwordReset";
import { isValidCode, isValidPassword } from "../../../util";
import { getErrorTranslateKey } from "../../../util/apiLocaleUtil";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { InputPassword } from "../../atoms/Input/InputPassword";
import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

type SecurityValidationProps = {
    email: string
    onNextStep: () => void;
}

export const SecurityValidation = ({ email, onNextStep }: SecurityValidationProps) => {
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({ code: "", password: "" })
    const [apiError, setApiError] = useState("")
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation();

    const handleSubmit = useCallback(async () => {
        if (!isValidCode(code)) {
            setError(error => ({ ...error, code: request.input_error_invalid_code }))
        } else if (!isValidPassword(password)) {
            setError(error => ({ ...error, password: request.input_error_required_field }))
        } else {
            try {
                setApiError("")
                setLoading(true)
                await resetPassword(email, code, password)
                setLoading(false)
                onNextStep()
            } catch (error) {
                setLoading(false)
                setApiError(getErrorTranslateKey(error))
            }
        }
    }, [code, email, onNextStep, password])

    return (
        <div className={styles.content}>
            <Text>{t(request.password_reset_security_code_help)}</Text>
            <div>
                <Input
                    value={code}
                    error={error.code.length > 0}
                    placeholder={t(request.input_code_placeholder)}
                    onChange={(event) => {
                        setError(error => ({ ...error, code: "" }))
                        setCode(event.target.value)
                    }}
                />
                {error.code.length ? <Text type="danger">{t(error.code)}</Text> : null}
            </div>
            <div>
                <InputPassword
                    value={password}
                    error={error.password.length > 0}
                    placeholder={t(request.input_password_placeholder)}
                    onChange={(event) => {
                        setError(error => ({ ...error, password: "" }))
                        setPassword(event.target.value)
                    }}
                />
                {error.password.length ? <Text type="danger">{t(error.password)}</Text> : null}
            </div>
            {apiError.length ? <Text type="danger">{t(apiError)}</Text> : null}
            <Button
                loading={loading}
                onClick={handleSubmit}>
                {t(request.reset_password_button_label)}
            </Button>
        </div>
    )
}