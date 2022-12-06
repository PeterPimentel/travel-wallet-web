import useTranslation from "next-translate/useTranslation";
import { useCallback, useState } from "react";

import { request } from "../../../constants/locales";
import { resetRequest } from "../../../service/passwordReset";
import { isValidEmail } from "../../../util";
import { getErrorTranslateKey } from "../../../util/apiLocaleUtil";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { H5, Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

type EmailRequestProps = {
    email: string;
    onChangeEmail: (email: string) => void
    onNextStep: () => void;
}

export const EmailRequest = ({ email, onChangeEmail, onNextStep }: EmailRequestProps) => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation();

    const handleSubmit = useCallback(async () => {
        if (!isValidEmail(email)) {
            setError(request.input_error_empty_email)
        } else {
            try {
                setLoading(true)
                await resetRequest(email)
                setLoading(false)
                onNextStep()
            } catch (error) {
                setLoading(false)
                setError(getErrorTranslateKey(error))
            }
        }
    }, [email, onNextStep])

    return (
        <div className={styles.content}>
            <H5>{t(request.password_reset_email_help)}</H5>
            <div>
                <Input
                    value={email}
                    error={error.length > 0}
                    placeholder={t(request.input_email_placeholder)}
                    onChange={(event) => {
                        setError("")
                        onChangeEmail(event.target.value)
                    }}
                />
                {error.length ? <Text type="danger">{t(error)}</Text> : null}
            </div>
            <Button loading={loading} onClick={handleSubmit}>{t(request.email_me)}</Button>
        </div>
    )
}