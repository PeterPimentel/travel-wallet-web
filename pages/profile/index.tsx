import { FC, useState, useCallback } from "react";
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";

import { SessionProps, withSessionHOC } from "../../src/lib/withSessionHOC";
import { getToken, removeToken } from "../../src/service/token";
import { common } from "../../src/constants/locales";
import { remove } from "../../src/service/user";
import { retryActivation } from "../../src/service/auth";
import { getTravelsURL } from "../../src/util";
import { StoreActions } from "../../src/types/StoreType";
import { getErrorTranslateKey } from "../../src/util/apiLocaleUtil";

import { Button } from "../../src/components/atoms/Button/Button";
import { notification } from "../../src/components/atoms/Notification/Notification";

import { DangerZone } from "../../src/components/molecules/DangerZone/DangerZone";
import { PageTitle } from "../../src/components/molecules/PageTitle/PageTitle";
import { CommonPageTemplate } from "../../src/components/templates/CommonPageTemplate/CommonPageTemplate";

import styles from "./style.module.css"

const ProfilePage: FC = (props: SessionProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const [actEmailButtonDisabled, setActEmailButtonDisabled] = useState(false)
    const [actEmailButtonLoading, setActEmailButtonLoading] = useState(false)
    const token = getToken();

    const saveTravels = useStoreActions<StoreActions>(
        (actions) => actions.saveTravels
    );

    const handleLogout = useCallback(() => {
        saveTravels([])
        removeToken()
        router.push("/")
    }, [router, saveTravels])

    const handleActivationRetry = useCallback(async () => {
        setActEmailButtonLoading(true)
        try {
            await retryActivation(token)

            notification(t(common.activation_email_sent), "success")
        } catch (error) {
            notification(error.message, "error")
        }
        setActEmailButtonDisabled(true)
        setActEmailButtonLoading(false)
    }, [t, token])

    const handleDeleteAccount = useCallback(async () => {
        try {
            await remove(token)
            notification(t(common.delete_profile_success), "success")
            removeToken()
            router.push("/")
        } catch (error) {
            notification(t(getErrorTranslateKey(error)), "error")
        }
    }, [router, t, token])

    return (
        <CommonPageTemplate link={getTravelsURL()}>
            <div>
                <div className={styles.info}>
                    <PageTitle title={t(common.profile)} />
                    <Button onClick={handleLogout}>{t(common.logout)}</Button>
                </div>
                <div className={styles.activationMail}>
                    {
                        props.data?.active === false ?
                            <Button
                                layout="default"
                                loading={actEmailButtonLoading}
                                disabled={actEmailButtonDisabled}
                                onClick={handleActivationRetry}>
                                {t(common.activation_email_retry)}
                            </Button> : null
                    }
                </div>
                <DangerZone
                    resource={t(common.account)}
                    buttonText={t(common.delete_profile)}
                    onClick={handleDeleteAccount}
                />
            </div>
        </CommonPageTemplate>
    )
}

export default withSessionHOC(ProfilePage);