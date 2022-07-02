import { FC, useCallback, useState } from "react";
import { useTranslation } from "next-i18next";

import { TravelRequest } from "../../../types/ApiType";
import { isValidTravelSubmit } from "../../../util";

import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { H5, Text } from "../../atoms/Typography/Typography";
import { TravelImageRadioButton } from "../../molecules/TravelImageRadioButton/TravelImageRadioButton";

import styles from "./style.module.css"

interface TravelFormProps {
    initialName?: string;
    initialCover?: string;
    onSubmit: (expense: TravelRequest) => void
}

interface TravelFormError {
    name: boolean;
    cover: boolean;
}

export const TravelForm: FC<TravelFormProps> = ({
    initialName,
    initialCover,
    onSubmit
}) => {
    const [name, setName] = useState(initialName || "")
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
            })
        }
    }, [name, imageCover, onSubmit])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <Input
                    required
                    value={name}
                    error={error.name}
                    placeholder={t("input_travel_name_placeholder")}
                    onChange={handleNameChange}
                />
            </div>
            <div className={styles.inputContainer}>
                <H5>{t("travel_cover")}</H5>
                {error.cover ? <Text type="danger">{t("travel_cover_not_set")}</Text> : null}
                <TravelImageRadioButton value={imageCover} onChange={handleImageCoverChange} />
            </div>
            <div className={styles.submitContainer}>
                <Button type="submit">{t("save")}</Button>
            </div>
        </form>
    )
}

