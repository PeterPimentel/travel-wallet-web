import { FC } from "react";
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from "next/router";

import { ROUTES } from "../../src/constants";
import { withSessionHOC } from "../../src/lib/withSessionHOC";
import { getToken, removeToken } from "../../src/service/token";
import { common } from "../../src/constants/locales";
import { remove } from "../../src/service/user";

import { Button } from "../../src/components/atoms/Button/Button";
import { notification } from "../../src/components/atoms/Notification/Notification";
import { H3 } from "../../src/components/atoms/Typography/Typography";

import { BasicHeader } from "../../src/components/molecules/BasicHeader/BasicHeader";
import { DangerZone } from "../../src/components/molecules/DangerZone/DangerZone";

import styles from "./style.module.css"

const ProfilePage: FC = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const handleLogout = () => {
        removeToken()
        router.push("/")
    }

    const handleDeleteAccount = async () => {
        try {
            const token = getToken();
            await remove(token)
            notification(t(common.delete_profile_success), "success")
            removeToken()
            router.push("/")
        } catch (error) {
            notification(error.message, "error")
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <BasicHeader link={`/${ROUTES.travel}`} linkText={t(common.back)} />
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <H3>{t(common.profile)}</H3>
                    <Button onClick={handleLogout}>{t(common.logout)}</Button>
                </div>
                <DangerZone
                    resource={t(common.account)}
                    buttonText={t(common.delete_profile)}
                    onClick={handleDeleteAccount}
                />
            </div>
        </div>
    )
}

export default withSessionHOC(ProfilePage);