import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { ROUTES } from "../../src/constants";
import { signup } from "../../src/service/auth";
import { AuthRequest } from "../../src/types/ApiType";
import { saveToken } from "../../src/service/token";

import { SignInForm } from "../../src/components/organism/SignInForm/SignInForm";
import { LogoWithName } from "../../src/components/molecules/LogoWithName/LogoWithName";

import styles from "./style.module.css"

const SignupPage = () => {
    const [apiError, setApiError] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = useCallback(async (authData: AuthRequest) => {
        setButtonLoading(true);
        signup(authData).then((res) => {
            saveToken(res.token)
            setButtonLoading(false)
            router.push(`/${ROUTES.travel}`)
        }).catch((error) => {
            setButtonLoading(false)
            setApiError(error.message)
        })
    }, [router])

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
