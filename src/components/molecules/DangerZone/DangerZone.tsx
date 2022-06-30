import { FC } from "react";
import { useTranslation } from "next-i18next";

import { Button } from "../../atoms/Button/Button";
import { Divider } from "../../atoms/Divider/Divider";
import { Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"

interface DangerZoneProps {
    buttonText: string;
    onClick: () => void;
}

export const DangerZone: FC<DangerZoneProps> = ({ buttonText, onClick }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Divider><Text type="danger">{t("danger_zone")}</Text></Divider>
            <div className={styles.action}>
                <Button danger onClick={onClick}>{buttonText}</Button>
            </div>
        </div>
    )
}