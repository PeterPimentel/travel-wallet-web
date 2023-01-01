/* eslint-disable @next/next/no-img-element */
import { LogoSize } from "../../../types/CommonType";

import styles from "./style.module.css"

type CountryFlagProps = {
    src: string;
    country: string;
    size?: LogoSize;
}

export const CountryFlag = ({ src, country, size = "regular" }: CountryFlagProps) => {
    return (
        <div className={`${styles.container} ${styles[size]}`}>
            <img className={styles[size]} src={src} alt={`${country} flag`} />
        </div>
    )
}