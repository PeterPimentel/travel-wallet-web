import { FC } from "react";
import { Button as BaseButton } from "antd"
import classname from "classnames";

import styles from "./style.module.css"


interface ButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    danger?: boolean;
    loading?: boolean;
    disabled?: boolean;
    type?: "submit" | "button";
    size?: "large" | "middle" | "small";
    layout?: "primary" | "default";
    onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
    children,
    icon = null,
    danger = false,
    loading = false,
    disabled = false,
    size = "middle",
    type = "button",
    layout = "primary",
    onClick
}) => {
    const buttonStyle = classname({ [styles.icon]: !!icon }, styles[layout])

    const handleOnClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return <BaseButton
        className={buttonStyle}
        icon={icon}
        loading={loading}
        disabled={disabled}
        type={layout}
        shape="round"
        size={size}
        danger={danger}
        htmlType={type}
        onClick={handleOnClick}
    >
        {children}
    </BaseButton>
}