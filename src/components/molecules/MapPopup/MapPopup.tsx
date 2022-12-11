import useTranslation from "next-translate/useTranslation";
import { FaClock, FaMoneyBillAlt, FaRegCalendarAlt } from "react-icons/fa";
import { Popup } from "react-leaflet"

import { EXPENSE_COLORS } from "../../../constants";
import { maps } from "../../../constants/locales";
import { formatDate } from "../../../util/dateHelper";

import { H5, Text } from '../../atoms/Typography/Typography'

import styles from './style.module.css';

type MapPopupProps = {
    title: string;
    startDate: string;
    endDate: string;
    spent: number;
    days: number;
}

export const MapPopup = ({ title, days, spent, startDate, endDate, }: MapPopupProps) => {

    const { t } = useTranslation();

    const items = [
        {
            id: "days",
            text: `${startDate} / `,
            value: `${endDate}`,
            icon: <FaRegCalendarAlt style={{ color: EXPENSE_COLORS.drink }} />
        },
        {
            id: "duration",
            text: t(maps.popup_days),
            value: days,
            icon: <FaClock style={{ color: EXPENSE_COLORS.transport }} />
        },
        {
            id: "total_spent",
            text: t(maps.popup_spent),
            value: spent,
            icon: <FaMoneyBillAlt style={{ color: EXPENSE_COLORS.shopping }} />
        }
    ]

    return (
        <Popup>
            <div>
                <div>
                    <H5>{title}</H5>
                </div>
                <ul className={styles.list}>
                    {
                        items.map(item => (
                            <li key={item.id} className={styles.item}>
                                <div className={styles.category}>
                                    {item.icon}
                                    <Text>{item.text}</Text>
                                </div>
                                <Text>{item.value}</Text>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Popup>
    )
}