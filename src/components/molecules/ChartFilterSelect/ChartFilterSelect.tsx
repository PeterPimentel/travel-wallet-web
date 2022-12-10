import { useMemo } from "react";
import useTranslation from "next-translate/useTranslation";

import { overview } from "../../../constants/locales";
import { CHART_FILTER } from "../../../constants";

import { Select } from "../../atoms/Select/Select";
import { Text } from "../../atoms/Typography/Typography";

type ChartFilterSelectProps = {
    value: string;
    onSelect: (filter: string) => void
}
export const ChartFilterSelect = ({ value, onSelect }: ChartFilterSelectProps) => {
    const { t } = useTranslation();

    const FILTERS = useMemo(() => {
        return [
            {
                value: CHART_FILTER.category,
                text: t(overview.filter_label_category)
            },
            {
                value: CHART_FILTER.country,
                text: t(overview.filter_label_country)
            },
            {
                value: CHART_FILTER.payment,
                text: t(overview.filter_label_payment)
            }
        ]
    }, [t])

    return (
        <div>
            <Text>{t(overview.filter_by)}</Text>
            <Select placeholder={t(overview.filter_by)} value={value} options={FILTERS} showSearch={false} onChange={onSelect} />
        </div>
    )

}