import { Select as BaseSelect } from 'antd';
import React from 'react';

import { SelectOption } from '../../../types/CommonType';

const { Option } = BaseSelect;

type SelectProps = {
    value?: string;
    options: SelectOption[];
    placeholder: string;
    loading?: boolean;
    disabled?: boolean;
    onSearch: (value: string) => void
    onChange: (value: string) => void
}

export const Select = ({
    value,
    options,
    loading = false,
    disabled = false,
    placeholder,
    onSearch,
    onChange
}: SelectProps) => (
    <BaseSelect
        showSearch
        loading={loading}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        filterOption={false}
        style={{ width: '100%' }}
    >
        {
            options.map(({ value, text }) => <Option key={value} value={value}>{text}</Option>)
        }
    </BaseSelect>
);
