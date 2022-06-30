import { Typography as BaseTypography } from 'antd';

const { Title: BaseTitle, Text: BaseText } = BaseTypography;

interface TypographyProps {
    children: string | number;
    type?: "secondary" | "success" | "warning" | "danger"
}

export const H1 = ({ children }: TypographyProps) => {
    return <BaseTitle>{children}</BaseTitle>
}

export const H2 = ({ children }: TypographyProps) => {
    return <BaseTitle level={2}>{children}</BaseTitle>
}

export const H3 = ({ children }: TypographyProps) => {
    return <BaseTitle level={3}>{children}</BaseTitle>
}

export const H4 = ({ children }: TypographyProps) => {
    return <BaseTitle level={4}>{children}</BaseTitle>
}

export const H5 = ({ children }: TypographyProps) => {
    return <BaseTitle level={5}>{children}</BaseTitle>
}

export const Text = ({ children, type }: TypographyProps) => {
    return <BaseText type={type}>{children}</BaseText>
}