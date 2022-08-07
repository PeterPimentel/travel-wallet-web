import { useCallback, useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { APP_NAME, ROUTES } from "../../src/constants";
import { signin } from "../../src/service/auth"
import { AuthRequest } from "../../src/types/ApiType";
import { saveToken } from "../../src/service/token";

import { H3 } from "../../src/components/atoms/Typography/Typography";
import { AppLogo } from "../../src/components/atoms/AppLogo/AppLogo";
import { SignInForm } from "../../src/components/organism/SignInForm/SignInForm";

import styles from "./style.module.css"
import { useRouter } from "next/router";

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
        <div className={styles.logoContainer}>
            <AppLogo size="extraLarge" />
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
            ...(await serverSideTranslations(locale, ['auth'])),
        },
    };
}

export default SiginPage;
