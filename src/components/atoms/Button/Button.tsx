import { FC } from "react";
import { Button as BaseButton } from "antd"
import classname from "classnames";

import styles from "./style.module.css"


interface ButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    danger?: boolean;
    loading?: boolean;
    type?: "submit" | "button"
    size?: "large" | "middle" | "small";
    onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, icon = null, danger = false, loading = false, size = "middle", type = "button", onClick }) => {

    const buttonStyle = classname({ [styles.icon]: !!icon })

    const handleOnClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return <BaseButton
        className={buttonStyle}
        icon={icon}
        loading={loading}
        type="primary"
        shape="round"
        size={size}
        danger={danger}
        htmlType={type}
        onClick={handleOnClick}
    >
        {children}
    </BaseButton>
}