import { FC } from "react";
import useTranslation from 'next-translate/useTranslation'
import { FaPlusCircle } from "react-icons/fa";

import { common } from "../../../constants/locales";

import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

export const AddTravelButton: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.optionButton}>
            <FaPlusCircle />
            <Text>{t(common.add)}</Text>
        </div>
    )
}