import { FC } from "react";
import useTranslation from 'next-translate/useTranslation'

import { common } from "../../../constants/locales";

import { Button } from "../../atoms/Button/Button";
import { Divider } from "../../atoms/Divider/Divider";
import { Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"
import { PopConfirm } from "../../atoms/PopConfirm/PopConfirm";
import { FaFire } from "react-icons/fa";

interface DangerZoneProps {
    resource: string;
    buttonText: string;
    onClick: () => void;
}

export const DangerZone: FC<DangerZoneProps> = ({ buttonText, resource, onClick }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Divider><Text type="danger">{t(common.danger_zone)}</Text></Divider>
            <div className={styles.action}>
                <PopConfirm resource={resource} onConfirm={onClick}>
                    <Button icon={<FaFire />} danger>{buttonText}</Button>
                </PopConfirm>
            </div>
        </div>
    )
}