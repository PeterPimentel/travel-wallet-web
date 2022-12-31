import useTranslation from 'next-translate/useTranslation'
import { FaTrashAlt } from "react-icons/fa";

import { common } from "../../../constants/locales";

import { Button } from "../../atoms/Button/Button";
import { Divider } from "../../atoms/Divider/Divider";
import { Text } from "../../atoms/Typography/Typography";
import { PopConfirm } from "../../atoms/PopConfirm/PopConfirm";

import styles from "./style.module.css"

interface DangerZoneProps {
    resource: string;
    buttonText: string;
    onClick: () => void;
}

export const DangerZone = ({ buttonText, resource, onClick }: DangerZoneProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Divider><Text type="danger">{t(common.danger_zone)}</Text></Divider>
            <div className={styles.action}>
                <PopConfirm text={t(common.confirmation_message, { resource_type: resource })} onConfirm={onClick}>
                    <Button icon={<FaTrashAlt />} danger>{buttonText}</Button>
                </PopConfirm>
            </div>
        </div>
    )
}