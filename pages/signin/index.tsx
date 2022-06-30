import { useCallback, useState, useContext } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router'

import { APP_NAME, ROUTES } from "../../src/constants";
import { signin } from "../../src/service/auth"
import { AuthContext } from "../../src/hooks/useAuthContext";
import { AuthRequest } from "../../src/types/ApiType";

import { H3 } from "../../src/components/atoms/Typography/Typography";
import { AppLogo } from "../../src/components/atoms/AppLogo/AppLogo";
import { SignInForm } from "../../src/components/organism/SignInForm/SignInForm";

import styles from "./style.module.css"

const SiginPage = () => {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [apiError, setApiError] = useState("")

    const router = useRouter()

    const authContext = useContext(AuthContext);

    const handleSubmit = useCallback(async ({ email, password }: AuthRequest) => {
        setButtonLoading(true);
        signin(email, password).then((res) => {
            if (res) {
                authContext.setAuthState({
                    username: res.user.username,
                    id: res.user.id,
                    token: res.token
                })
            }
        }).catch((error) => {
            setApiError(error.message)
        }).finally(() => {
            setButtonLoading(false)
        })
    }, [authContext])

    if (authContext.isAuthenticated()) {
        router.push(`/${ROUTES.travel}`)
    }

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
