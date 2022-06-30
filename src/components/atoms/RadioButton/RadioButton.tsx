import { FC, ReactNode } from "react";
import { Radio } from "antd";
import { RadioButtonOnChangeEvent } from "../../../types/CommonType";

interface RadioOption {
    value: string;
    text: ReactNode;
}

interface RadioButtonProps {
    value: string;
    onChange: (e: RadioButtonOnChangeEvent) => void;
    options: RadioOption[]

}

export const RadioButton: FC<RadioButtonProps> = ({ value, options, onChange }) => {
    return (
        <Radio.Group onChange={onChange} value={value}>
            {
                options.map((option) => <Radio.Button
                    key={option.value}
                    value={option.value}>
                    {option.text}
                </Radio.Button>
                )
            }
        </Radio.Group>
    );
}