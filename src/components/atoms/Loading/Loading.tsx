import { Spin } from "antd";
import { FC } from "react";

interface LoadingProps {
    loading: boolean;
    size?: "small" | "default" | "large"
    children?: React.ReactNode;
}

export const Loading: FC<LoadingProps> = ({ loading, size = "default", children }) => {
    return <Spin spinning={loading} size={size}>{children}</Spin>
}