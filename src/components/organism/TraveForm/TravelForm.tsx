import { FC, useCallback, useState } from "react";
import useTranslation from 'next-translate/useTranslation'

import { TravelRequest } from "../../../types/ApiType";
import { isValidTravelSubmit } from "../../../util";
import { common } from "../../../constants/locales";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { H5, Text } from "../../atoms/Typography/Typography";
import { TravelImageRadioButton } from "../../molecules/TravelImageRadioButton/TravelImageRadioButton";
import { CurrencyInput } from "../../molecules/CurrencyInput/CurrencyInput";

import styles from "./style.module.css"

interface TravelFormProps {
    initialName?: string;
    initialCover?: string;
    initialBudget?: number;
    onSubmit: (expense: TravelRequest) => void
}

interface TravelFormError {
    name: boolean;
    cover: boolean;
}

export const TravelForm: FC<TravelFormProps> = ({
    initialName,
    initialCover,
    initialBudget,
    onSubmit
}) => {
    const [name, setName] = useState(initialName || "")
    const [budget, setBudget] = useState(initialBudget || 0)
    const [imageCover, setImageCover] = useState(initialCover || "")
    const [error, setError] = useState<TravelFormError>({ name: false, cover: false })
    const { t } = useTranslation();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(error => ({ ...error, name: false }))
        setName(event.target.value)
    }

    const handleImageCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(error => ({ ...error, cover: false }))
        setImageCover(event.target.value)
    }

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            setError(error => ({ ...error, name: true }))
        }

        if (!imageCover.trim()) {
            setError(error => ({ ...error, cover: true }))
        }

        if (isValidTravelSubmit(name, imageCover)) {
            onSubmit({
                name: name.trim(),
                cover: imageCover,
                budget: budget
            })
        }
    }, [name, imageCover, onSubmit, budget])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <Input
                    required
                    value={name}
                    error={error.name}
                    placeholder={t(common.input_travel_name_placeholder)}
                    onChange={handleNameChange}
                />
            </div>
            <div className={styles.inputContainer}>
                <CurrencyInput
                    value={budget}
                    onchange={(value) => setBudget(value)}
                />
            </div>
            <div className={styles.inputContainer}>
                <H5>{t(common.travel_cover)}</H5>
                {error.cover ? <Text type="danger">{t(common.travel_cover_not_set)}</Text> : null}
                <TravelImageRadioButton value={imageCover} onChange={handleImageCoverChange} />
            </div>
            <div className={styles.submitContainer}>
                <Button type="submit">{t(common.save)}</Button>
            </div>
        </form>
    )
}

