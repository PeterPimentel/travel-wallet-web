import { FC, ReactNode } from "react";
import { Input as BaseInput } from "antd"

import styles from "./style.module.css"

interface InputProps {
    placeholder: string;
    value: string | number;
    disabled?: boolean;
    prefix?: ReactNode;
    required?: boolean;
    error?: boolean;
    type?: "text" | "email";
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({ placeholder, value, disabled = false, required = false, prefix, error = false, type = "text", onChange }) => {
    return <BaseInput
        className={styles.input}
        disabled={disabled}
        placeholder={placeholder}
        prefix={prefix}
        size="large"
        status={error ? "error" : undefined}
        value={value}
        type={type}
        required={required}
        onChange={onChange}
    />
}