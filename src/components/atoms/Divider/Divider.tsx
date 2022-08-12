import { FC, ReactNode } from 'react';
import { Divider as BaseDivider } from 'antd';


interface DividerProps {
    children: string | ReactNode;
}

export const Divider: FC<DividerProps> = ({ children }) => {
    return <BaseDivider plain>{children}</BaseDivider>
}