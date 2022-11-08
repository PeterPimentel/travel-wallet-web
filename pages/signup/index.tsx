import { useCallback, useState } from "react";
import useTranslation from "next-translate/useTranslation";

import { signup } from "../../src/service/auth";
import { AuthRequest } from "../../src/types/ApiType";
import { auth } from "../../src/constants/locales";

import { SignInForm } from "../../src/components/organism/SignInForm/SignInForm";
import { LogoWithName } from "../../src/components/molecules/LogoWithName/LogoWithName";
import { notification } from "../../src/components/atoms/Notification/Notification";

import styles from "./style.module.css"

const SignupPage = () => {
    const [apiError, setApiError] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)
    const { t } = useTranslation();

    const handleSubmit = useCallback(async (authData: AuthRequest) => {
        setButtonLoading(true);
        signup(authData).then(() => {
            notification(t(auth.activation_email_sent), "success")
        }).catch((error) => {
            setApiError(error.message)
        }).finally(() => {
            setButtonLoading(false)
        })
    }, [t])

    return <div className={styles.page}>
        <LogoWithName size="extraLarge" layout="vertical" />
        <SignInForm
            type="signup"
            error={apiError}
            buttonLoading={buttonLoading}
            onSubmit={handleSubmit}
        />
    </div>
}

export default SignupPage
