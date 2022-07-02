import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import { AuthContext } from "../../src/hooks/useAuthContext";
import { ROUTES } from "../../src/constants";

import { Button } from "../../src/components/atoms/Button/Button";
import { H3 } from "../../src/components/atoms/Typography/Typography";
import { BasicHeader } from "../../src/components/molecules/BasicHeader/BasicHeader";
import { DangerZone } from "../../src/components/molecules/DangerZone/DangerZone";

import styles from "./style.module.css"

const ProfilePage: FC = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const authContext = useContext(AuthContext);

    const handleLogout = () => {
        authContext.logOut()
        router.push("/")
    }

    return (
        <div className={styles.page}>
            <BasicHeader link={`/${ROUTES.travel}`} linkText={t("back")} />
            <div className={styles.content}>
                <div className={styles.info}>
                    <H3>{t("profile")}</H3>
                    <Button onClick={handleLogout}>{t("logout")}</Button>
                </div>
                <DangerZone
                    buttonText={t("delete_profile")}
                    onClick={() => null}
                />
            </div>
        </div>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default ProfilePage;