import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

import { APP_NAME } from "../../../constants";
import { common } from '../../../constants/locales';
import { getTravelsURL } from '../../../util';

import { AccessDenied } from '../../molecules/AccessDenied/AccessDenied';
import { BasicHeader } from '../../molecules/BasicHeader/BasicHeader';

import styles from "./style.module.css"

type CommonPageTemplate = {
    children: React.ReactNode;
    title?: string;
    link: string;
    linkText?: string;
    showAppName?: boolean;
}

export const CommonPageTemplate = ({ children, title, link, linkText, showAppName }: CommonPageTemplate) => {
    const { t } = useTranslation();

    return (
        <div className={styles.page}>
            <Head>
                <title>{title ? title : APP_NAME}</title>
                <meta name="description" content={APP_NAME} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.header}>
                <BasicHeader link={link} linkText={linkText ? linkText : t(common.back)} showAppName={showAppName} />
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}