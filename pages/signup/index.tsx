import { useCallback, useState } from "react";

import { APP_NAME } from "../../src/constants";
import { signup } from "../../src/service/auth";
import { AuthRequest } from "../../src/types/ApiType";

import { AppLogo } from "../../src/components/atoms/AppLogo/AppLogo";
import { H3 } from "../../src/components/atoms/Typography/Typography";
import { SignInForm } from "../../src/components/organism/SignInForm/SignInForm";

import styles from "./style.module.css"

const SignupPage = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [apiError, setApiError] = useState("")

    const handleSubmit = useCallback(async (data: AuthRequest) => {
        setButtonLoading(true);
        signup(data).then(() => {
        }).catch((error) => {
            setApiError(error.message)
        }).finally(() => {
            setButtonLoading(false)
        })
    }, [])

    return <div className={styles.page}>
        <div className={styles.logoContainer}>
            <AppLogo size="extraLarge" />
            <H3>{APP_NAME}</H3>
        </div>
        <SignInForm
            type="signup"
            error={apiError}
            buttonLoading={buttonLoading}
            onSubmit={handleSubmit}
        />
    </div>
}

export default SignupPage
