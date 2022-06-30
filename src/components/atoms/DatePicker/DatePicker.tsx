import { FC } from 'react';
import BaseDatePicker from "react-datepicker";

import { DATE_FORMAT } from '../../../constants';
import { formatDate, isValidDate, parseDate } from '../../../util/dateHelper';

import "react-datepicker/dist/react-datepicker.css";
import styles from "./style.module.css"

interface DatePickerProps {
    onChange: (dateString: string) => void;
    value?: string;
}

export const DatePicker: FC<DatePickerProps> = ({ onChange, value }) => {
    const handleOnChange = (date: Date) => {
        if (isValidDate(date)) {
            onChange(formatDate(date))
        }
    };

    const dateValue = value ? parseDate(value, DATE_FORMAT) : undefined

    return (
        <BaseDatePicker
            dateFormat={DATE_FORMAT}
            onChange={handleOnChange}
            selected={dateValue}
            calendarClassName={styles.calendar}
            className={styles.input}
        />
    )
}
