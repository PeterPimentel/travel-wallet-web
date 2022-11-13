import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

import { APP_NAME, ROUTES } from "../../../constants";
import { common } from '../../../constants/locales';

import { AppLogo } from '../../atoms/AppLogo/AppLogo';
import { Button } from "../../atoms/Button/Button";
import { NavigationLink } from "../../atoms/NavigationLink/NavigationLink";
import { Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"

type NotFoundTemplateProps = {
}

export const NotFoundTemplate = ({ }: NotFoundTemplateProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.page}>
            <Head>
                <title>{`404 - ${APP_NAME}`}</title>
                <meta name="description" content={APP_NAME} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.header}>
                <NavigationLink to={`/`}>
                    <AppLogo variant='white' />
                </NavigationLink>
            </div>
            <div className={styles.content}>
                <Text>{t(common.not_found_text)}</Text>
                <Button>
                    <NavigationLink to={`/${ROUTES.travel}`}>
                        {t(common.back)}
                    </NavigationLink>
                </Button>
            </div>
            <div className={styles.credit}>
                <a href="https://www.freepik.com/free-vector/error-404-concept-landing-page_4730712.htm#query=404&position=6&from_view=search&track=sph">Image by pikisuperstar</a>
            </div>
        </div>
    )
}