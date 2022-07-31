import { FC } from "react";
import classname from "classnames";

import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css";

interface ChipProps {
    children: string | number;
    type?: "default" | "success" | "warning" | "danger" | "transparent"
}

export const Chip: FC<ChipProps> = ({ children, type = "default" }) => {
    const chipStyle = classname(styles.chip, styles[type])

    return <div className={chipStyle}>
        <Text>{children}</Text>
    </div>
}