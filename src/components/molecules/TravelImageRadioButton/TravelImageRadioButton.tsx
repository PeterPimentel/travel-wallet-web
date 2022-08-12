/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

import { CDN_IMAGE_BASE_URL } from "../../../constants";
import useCoverImages from "../../../hooks/useCoverImages";

import { SkeletonImage } from "../../atoms/Skeleton/Skeleton";

import styles from "./style.module.css"

interface TravelImageRadioButtonProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TravelImageRadioButton: FC<TravelImageRadioButtonProps> = ({ value, onChange }) => {
    const { data, isLoading } = useCoverImages()

    return (
        <div className={styles.radioButtonContainer}>
            {
                isLoading ? new Array(5).fill(1).map((_, i) => <SkeletonImage key={i} width="80px" height="80px" />) : null
            }
            {
                (data || []).map(image => (
                    <label key={image.id} className={styles.inputContainer} htmlFor={image.name}>
                        <input
                            onChange={onChange}
                            checked={value === image.name}
                            value={image.name}
                            id={image.name}
                            type="radio"
                            name="travel-cover"
                            className={styles.input}
                        />
                        <div className={styles.optionButton}>
                            <img src={`${CDN_IMAGE_BASE_URL}${image.name}`} alt={image.description} />
                        </div>
                    </label>
                ))
            }
        </div>
    )
}