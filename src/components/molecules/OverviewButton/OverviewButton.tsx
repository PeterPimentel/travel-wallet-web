import useTranslation from 'next-translate/useTranslation'
import { FaListUl } from "react-icons/fa";

import { common } from "../../../constants/locales";

import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

export const OverviewButton = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.optionButton}>
            <FaListUl />
            <Text>{t(common.overview)}</Text>
        </div>
    )
}