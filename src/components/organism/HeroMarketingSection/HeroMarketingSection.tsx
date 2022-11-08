import { Carousel, HeroMarketing } from "../../../types/CMSType";

import { H4, Text } from "../../atoms/Typography/Typography";
import { AppScreens } from "../../atoms/AppScreens/AppScreens";

import styles from "./style.module.css"

type HeroMarketingSectionProps = {
    hero: HeroMarketing;
    carousel: Carousel[];
    cover: string;
}

export const HeroMarketingSection = ({ hero, carousel, cover }: HeroMarketingSectionProps) => {

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <H4>{hero.title}</H4>
                <Text type="secondary">{hero.summary}</Text>
            </div>
            <AppScreens images={carousel} cover={cover} />
        </section>
    )
}