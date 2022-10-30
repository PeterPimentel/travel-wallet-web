import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import { ROUTES } from "../../src/constants";
import { signin } from "../../src/service/auth"
import { AuthRequest } from "../../src/types/ApiType";
import { saveToken } from "../../src/service/token";
import { apiLocalesMap, apiLocales } from "../../src/constants/apiLocales";

import { notification } from "../../src/components/atoms/Notification/Notification";
import { LogoWithName } from "../../src/components/molecules/LogoWithName/LogoWithName";
import { SignInForm } from "../../src/components/organism/SignInForm/SignInForm";

import styles from "./style.module.css"

const SiginPage = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [apiError, setApiError] = useState("")
    const router = useRouter();
    const { t } = useTranslation();

    const { status, code } = router.query

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

    useEffect(() => {
        if (status && code && apiLocales.includes(code as string)) {
            notification(t(apiLocalesMap[code as string]), status as any)
        }
    }, [code, status, t])

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
