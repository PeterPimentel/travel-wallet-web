/* eslint-disable @next/next/no-img-element */
import { getAssetSrc } from "../../../service/cms";
import { HeroMarketing } from "../../../types/CMSType";
import { H4, Text } from "../../atoms/Typography/Typography";

import styles from "./style.module.css"

type HeroMarketingSectionProps = {
    hero: HeroMarketing;
}

export const HeroMarketingSection = ({ hero }: HeroMarketingSectionProps) => {
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <H4>{hero.title}</H4>
                <Text type="secondary">{hero.summary}</Text>
            </div>
            <div className={styles.imageContainer}>
                <img src={getAssetSrc(hero.main_image)} alt="app screenshot" />
            </div>
        </section>
    )
}