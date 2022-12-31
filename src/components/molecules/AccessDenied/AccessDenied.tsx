import useTranslation from 'next-translate/useTranslation'
import { FaRegEyeSlash } from "react-icons/fa";

import { common } from "../../../constants/locales";

import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

export const AccessDenied = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <FaRegEyeSlash className={styles.icon} />
            <div className={styles.description}>
                <Text>{t(common.access_denied)}</Text>
                <Text type="secondary">{t(common.access_denied_description)}</Text>
            </div>
        </div>
    )
}

