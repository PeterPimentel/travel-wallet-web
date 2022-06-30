import { FC } from "react";
import { Skeleton } from "antd";

interface SkeletonImageProps {
    width?: string;
    height?: string;
}

interface SkeletonTextProps {
    size?: "large" | "small" | "default";
}

export const SkeletonText: FC<SkeletonTextProps> = ({ size = 'default' }) => {
    return <Skeleton.Input size={size} />
}

export const SkeletonImage: FC<SkeletonImageProps> = ({ width = '96px', height = '96px' }) => {
    return <Skeleton.Image style={{ width, height }} />
}