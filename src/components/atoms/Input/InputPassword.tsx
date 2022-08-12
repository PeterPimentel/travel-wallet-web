import { FC } from "react";
import { Input as BaseInput } from "antd"

interface InputPasswordProps {
    placeholder: string;
    value: string | number;
    error?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputPassword: FC<InputPasswordProps> = ({ placeholder, value, error = false, onChange }) => {
    return <BaseInput.Password
        placeholder={placeholder}
        size="large"
        status={error ? "error" : undefined}
        value={value}
        required
        onChange={onChange}
    />
}