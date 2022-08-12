import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ROUTES } from "../../../constants";
import { Button } from "../../atoms/Button/Button";

import { NavigationLink } from "../../atoms/NavigationLink/NavigationLink";
import { H1, Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"

type NotFoundTemplateProps = {
}

export const NotFoundTemplate = ({ }: NotFoundTemplateProps) => {
    const { t } = useTranslation();

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <H1>404</H1>
                <Text>{t('not_found_text')}</Text>
                <Button>
                    <NavigationLink to={`/${ROUTES.travel}`}>
                        {t('back')}
                    </NavigationLink>
                </Button>
            </div>
            <Image src="/assets/lost_404.png" alt="Not found" width={750} height={500} />
        </div>
    )
}