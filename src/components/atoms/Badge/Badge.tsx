import { Badge as BaseBadge } from "antd"

type BadgeProps = {
    dot?: boolean;
    children: React.ReactNode;
}

export const Badge = ({ children, dot }: BadgeProps) => {
    return <BaseBadge dot={dot}>{children}</BaseBadge>
}