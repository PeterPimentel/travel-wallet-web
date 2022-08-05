import { FeatureIcon } from "../../atoms/FeatureIcon/FeatureIcon";
import { H5, Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"

type FeatureCardProps = {
    title: string;
    icon: string;
    text: string;
}

export const FeatureCard = ({ title, icon, text }: FeatureCardProps) => {
    return (
        <div className={styles.card}>
            <FeatureIcon icon={icon} />
            <H5>{title}</H5>
            <Text>{text}</Text>
        </div>
    )
}