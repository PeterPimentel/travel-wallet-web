import { FC } from "react";
import { Input as BaseInput } from "antd"

interface TextAreaProps {
    disabled?: boolean;
    placeholder: string;
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextArea: FC<TextAreaProps> = ({ placeholder, value, disabled = false, onChange }) => {
    return <BaseInput.TextArea
        disabled={disabled}
        placeholder={placeholder}
        size="large"
        value={value}
        onChange={onChange}
    />
}