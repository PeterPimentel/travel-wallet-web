import { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";

import { statistics } from "../../../constants/locales";

import { Select } from "../../atoms/Select/Select";
import { Text } from "../../atoms/Typography/Typography";
import { SelectOption } from "../../../types/CommonType";

import styles from "./style.module.css"

type TravelYearSelectProps = {
    options: SelectOption[];
    value: string;
    onSelect: (filter: string) => void
}
export const TravelYearSelect = ({ value, options, onSelect }: TravelYearSelectProps) => {
    const { t } = useTranslation();

    const FILTERS = useMemo(() => {
        return (options || []).concat({
            value: "ALL",
            text: t(statistics.filter_period_all)
        })
    }, [options, t])

    return (
        <div className={styles.select}>
            <div className={styles.label}>
                <Text>{t(statistics.filter_period_label)}</Text>
            </div>
            <Select placeholder={""} value={value} options={FILTERS} showSearch={false} onChange={onSelect} />
        </div>
    )

}