import { useTranslation } from "next-i18next";
import { Feature } from "../../../types/CMSType";
import { H4, Text } from "../../atoms/Typography/Typography";
import { FeatureCard } from "../../molecules/FeatureCard/FeatureCard";

import styles from "./style.module.css"

type FeatureSectionProps = {
    features: Feature[];
}

export const FeatureSection = ({ features }: FeatureSectionProps) => {
    const { t } = useTranslation();

    return (
        <section className={styles.section}>
            <H4>{t('landing:menu_features')}</H4>
            <div className={styles.cards}>
                {
                    features.map(feature => (
                        <FeatureCard
                            key={feature.id}
                            title={feature.title}
                            icon={feature.icon}
                            text={feature.description}
                        />
                    ))
                }
            </div>
        </section>
    )
}