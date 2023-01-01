import useTranslation from 'next-translate/useTranslation'
import { FaGlobeAmericas, FaMapMarkerAlt, FaPlaneDeparture } from "react-icons/fa";

import { EXPENSE_COLORS } from "../../../constants";
import { common } from "../../../constants/locales";
import { Tracker, TrackerType } from '../../../types/CommonType';

import { Text } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

type TrackerCardProps = Tracker;

const Icon = ({ type }: { type: TrackerType }) => {
    switch (type) {
        case "FLIGHT":
            return <FaPlaneDeparture style={{ color: EXPENSE_COLORS.flight }} />
        case "CITY":
            return < FaMapMarkerAlt style={{ color: EXPENSE_COLORS.food }} />
        case "COUNTRY":
            return < FaGlobeAmericas style={{ color: EXPENSE_COLORS.hotel }} />
        default:
            return null
    }
}


export const TrackerCard = ({ value, type, description }: TrackerCardProps) => {

    return (
        <div className={styles.card}>
            <Text>{value}</Text>
            <div className={styles.description}>
                <Icon type={type} />
                <Text type="secondary">{description}</Text>
            </div>
        </div>
    )
}