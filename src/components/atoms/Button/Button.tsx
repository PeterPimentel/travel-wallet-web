import { FC } from "react";
import { Button as BaseButton } from "antd"

interface ButtonProps {
    children: React.ReactNode;
    danger?: boolean;
    loading?: boolean;
    type?: "submit" | "button"
    size?: "large" | "middle" | "small";
    onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, danger = false, loading = false, size = "middle", type = "button", onClick }) => {

    const handleOnClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return <BaseButton
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