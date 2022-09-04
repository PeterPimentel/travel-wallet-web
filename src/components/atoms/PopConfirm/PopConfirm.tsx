import { Popconfirm as BasePopconfirm } from 'antd';
import useTranslation from 'next-translate/useTranslation';

import { common } from '../../../constants/locales';

type PopConfirmProps = {
    children?: React.ReactNode;
    resource: string;
    onConfirm: () => void
}

export const PopConfirm = ({ children, resource, onConfirm }: PopConfirmProps) => {
    const { t } = useTranslation();

    return (
        <BasePopconfirm
            title={t(common.confirmation_message, { resource_type: resource })}
            onConfirm={onConfirm}
            okText={t(common.yes)}
            cancelText={t(common.no)}
        >
            {children}
        </BasePopconfirm>
    )
};