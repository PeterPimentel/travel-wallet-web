import { FaCrown } from "react-icons/fa"

import { CountryFlag } from "../../atoms/CountryFlag/CountryFlag"
import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

type Item = {
    flag: string;
    country: string;
    value: number;
}

type CountryProdiumProps = {
    items: Item[];
}

const positionByIndex = {
    0: "first",
    1: "second",
    2: "third"
}

export const CountryProdium = ({ items }: CountryProdiumProps) => {
    return (
        <div className={styles.container}>
            {
                items.map(((country, index) => (
                    <div key={index} className={`${styles.item} ${styles[positionByIndex[index]]}`}>
                        <div className={styles.position}>
                            <Text>{index + 1}</Text>
                            {index === 0 ? <FaCrown className={styles.crown} /> : null}
                        </div>
                        <div className={index === 0 ? styles.shadow : ""}>
                            <CountryFlag size='extraLarge' country={country.country} src={country.flag} />
                        </div>
                        <div className={styles.labels}>
                            <Text type="secondary">{country.country}</Text>
                            <div className={styles.value}>
                                <Text>{country.value}</Text>
                            </div>
                        </div>
                    </div>
                )))
            }
        </div>
    )
}