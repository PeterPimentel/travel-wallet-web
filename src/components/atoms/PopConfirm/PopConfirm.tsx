import { Popconfirm as BasePopconfirm } from 'antd';
import useTranslation from 'next-translate/useTranslation';

import { common } from '../../../constants/locales';

type PopConfirmProps = {
    children?: React.ReactNode;
    text: string;
    onConfirm: () => void
}

export const PopConfirm = ({ children, text, onConfirm }: PopConfirmProps) => {
    const { t } = useTranslation();

    return (
        <BasePopconfirm
            title={text}
            onConfirm={onConfirm}
            okText={t(common.yes)}
            cancelText={t(common.no)}
        >
            {children}
        </BasePopconfirm>
    )
};