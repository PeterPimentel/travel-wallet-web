import { useCallback, useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { APP_NAME, ROUTES } from "../../src/constants";
import { login } from "../../src/service/auth"
import { AuthRequest } from "../../src/types/ApiType";

import { H3 } from "../../src/components/atoms/Typography/Typography";
import { AppLogo } from "../../src/components/atoms/AppLogo/AppLogo";
import { SignInForm } from "../../src/components/organism/SignInForm/SignInForm";

import styles from "./style.module.css"
import useAuth from "../../src/hooks/useAuth";
import { saveToken } from "../../src/service/token";

const SiginPage = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [apiError, setApiError] = useState("")
    const { mutateAuth } = useAuth({
        redirectTo: `/${ROUTES.travel}`,
        redirectIfFound: true,
    })

    const handleSubmit = useCallback(async ({ email, password }: AuthRequest) => {
        setButtonLoading(true);
        login(email, password).then((res) => {
            saveToken(res.token)
            if (res) {
                mutateAuth(res)
            }
        }).catch((error) => {
            setApiError(error.message)
        }).finally(() => {
            setButtonLoading(false)
        })
    }, [mutateAuth])

    return <div className={styles.page}>
        <div className={styles.logoContainer}>
            <AppLogo size="large" />
            <H3>{APP_NAME}</H3>
        </div>
        <SignInForm
            type="signin"
            error={apiError}
            buttonLoading={buttonLoading}
            onSubmit={handleSubmit}
        />
    </div>
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default SiginPage;
