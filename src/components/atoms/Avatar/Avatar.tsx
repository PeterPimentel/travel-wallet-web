import { UserOutlined } from '@ant-design/icons';
import { Avatar as BaseAvatar } from 'antd';

type AvatarProps = {
    src?: string;
    size?: "small" | "default" | "large" | "extralarge"
}

export const Avatar = ({ src, size = "default" }: AvatarProps) => {
    const avatarSize = size === "extralarge" ? 64 : size

    return (
        <BaseAvatar
            size={avatarSize}
            src={src ? src : null}
            icon={!src ?
                <UserOutlined />
                : null}
        />
    )
}