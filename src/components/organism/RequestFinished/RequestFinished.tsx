import useTranslation from "next-translate/useTranslation";

import { request } from "../../../constants/locales";
import { getSignInURL } from "../../../util";

import { NavigationLink } from "../../atoms/NavigationLink/NavigationLink";
import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

export const RequestFinished = () => {

    const { t } = useTranslation();

    return (
        <div className={styles.content}>
            <Text type="success">{t(request.reset_password_finished_help)}</Text>
            <NavigationLink to={getSignInURL()}>{t(request.sign_in)}</NavigationLink>
        </div>
    )
}