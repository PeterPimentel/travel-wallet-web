import classname from "classnames";

import styles from "./style.module.css"

type Progress = {
    percent: number;
    color?: "danger" | "warning" | "info";
    size?: "small" | "big" | "regular";
}

const sanitizePercent = (value: number): number => {
    if (value > 100) {
        return 100
    }
    if (value < 0) {
        return 0
    }
    return value
}

const getColor = (value: number): string => {
    if (value >= 90) {
        return 'danger'
    }

    if (value > 70) {
        return 'warning'
    }

    return 'info'
}

export const Progress = ({ percent, size = "regular", color = "info" }: Progress) => {
    const containerStyle = classname(styles.container, styles[size])
    const barStyle = classname(styles.bar, styles[size], styles[color])

    return (
        <div className={containerStyle}>
            <div className={barStyle} style={{ width: `${sanitizePercent(percent)}%` }} />
        </div>
    )
}