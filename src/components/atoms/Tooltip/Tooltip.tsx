import { Tooltip as BaseTooltip } from 'antd';

type TooltipProps = {
    text: string;
    children: React.ReactNode
}

export const Tooltip = ({ children, text }: TooltipProps) => {
    return (
        <BaseTooltip title={text}>
            {children}
        </BaseTooltip>
    )
}