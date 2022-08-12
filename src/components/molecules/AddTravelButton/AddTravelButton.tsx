import { FC } from "react";
import { useTranslation } from 'react-i18next';
import { FaPlusCircle } from "react-icons/fa";

import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

export const AddTravelButton: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.optionButton}>
            <FaPlusCircle />
            <Text>{t('add')}</Text>
        </div>
    )
}