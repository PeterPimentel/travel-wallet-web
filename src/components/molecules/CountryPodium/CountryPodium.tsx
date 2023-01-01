import { FaCrown } from "react-icons/fa"

import { CountryFlag } from "../../atoms/CountryFlag/CountryFlag"
import { H5, Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

type Item = {
    flag: string;
    country: string;
    value: number;
}

type CountryProdiumProps = {
    title: string;
    items: Item[];
}

const ITEMS = [
    {
        flag: "https://flagcdn.com/w80/es.jpg",
        country: "Spain",
        value: 8,
    },
    {
        flag: "https://flagcdn.com/w80/it.jpg",
        country: "Italy",
        value: 6,
    },
    {
        flag: "https://flagcdn.com/w80/hu.jpg",
        country: "Hungary",
        value: 1,
    }
]

const positionByIndex = {
    0: "first",
    1: "second",
    2: "third"
}

export const CountryProdium = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <H5>Visited more cities</H5>
            </div>
            {
                ITEMS.map(((country, index) => (
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