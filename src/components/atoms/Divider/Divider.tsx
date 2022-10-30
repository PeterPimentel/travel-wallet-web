import { ReactNode } from 'react';
import { Divider as BaseDivider } from 'antd';

interface DividerProps {
    children: string | ReactNode;
}

export const Divider = ({ children }: DividerProps) => {
    return <BaseDivider plain>{children}</BaseDivider>
}