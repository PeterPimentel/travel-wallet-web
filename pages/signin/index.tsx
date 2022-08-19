import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { ROUTES } from "../../src/constants";
import { signin } from "../../src/service/auth"
import { AuthRequest } from "../../src/types/ApiType";
import { saveToken } from "../../src/service/token";

import { LogoWithName } from "../../src/components/molecules/LogoWithName/LogoWithName";
import { SignInForm } from "../../src/components/organism/SignInForm/SignInForm";

import styles from "./style.module.css"

const SiginPage = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [apiError, setApiError] = useState("")
    const router = useRouter();

    const handleSubmit = useCallback(async ({ email, password }: AuthRequest) => {
        setButtonLoading(true);
        signin(email, password).then((res) => {
            saveToken(res.token)
            router.push(`/${ROUTES.travel}`)
        }).catch((error) => {
            setApiError(error.message)
        }).finally(() => {
            setButtonLoading(false)
        })
    }, [router])

    return <div className={styles.page}>
        <LogoWithName size="extraLarge" layout="vertical" />
        <SignInForm
            type="signin"
            error={apiError}
            buttonLoading={buttonLoading}
            onSubmit={handleSubmit}
        />
    </div>
}

export default SiginPage;
