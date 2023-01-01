import useTranslation from "next-translate/useTranslation";
import { useMemo } from "react";
import { statistics } from "../../../constants/locales";
import { Tracker } from "../../../types/CommonType";
import { TrackerCard } from "../../molecules/TrackerCard/TrackerCard";

import styles from "./style.module.css"

type TrackerCardLisProps = {
    cities: number;
    countries: number;
    flights: number;
};

export const TrackerCardList = ({ cities, countries, flights }: TrackerCardLisProps) => {
    const { t } = useTranslation();

    const trackers = useMemo((): Tracker[] => {
        return [
            {
                type: "CITY",
                description: t(statistics.cities),
                value: cities,
            },
            {
                type: "COUNTRY",
                description: t(statistics.countries),
                value: countries,
            },
            {
                type: "FLIGHT",
                description: t(statistics.flights),
                value: flights,
            }
        ]
    }, [cities, countries, flights, t])

    return (
        <div className={styles.list}>
            {
                trackers.map(tracker => (
                    <TrackerCard key={tracker.type} type={tracker.type} value={tracker.value} description={tracker.description} />
                ))
            }
        </div>
    )
}