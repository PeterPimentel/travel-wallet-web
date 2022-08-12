/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import classnames from "classnames";

import { CDN_IMAGE_BASE_URL } from "../../../constants";

import styles from "./style.module.css"

const MOBILE_PHONE_GRID = `${CDN_IMAGE_BASE_URL}marketing/marketing_2.png`

const SCREEN_IMAGES = [
    `${CDN_IMAGE_BASE_URL}marketing/travel_page_no_border.png`,
    `${CDN_IMAGE_BASE_URL}marketing/expense_page_1_no_border.png`,
    `${CDN_IMAGE_BASE_URL}marketing/add_expense_page_no_border.png`,
]

const IMAGES_COUNT = SCREEN_IMAGES.length - 1

export const AppScreens = () => {
    const [currentFade, setCurrentFade] = useState(IMAGES_COUNT) // Last Index
    const [nextFade, setNextFade] = useState(IMAGES_COUNT - 1) // First Index

    useEffect(() => {
        let myInterval = setInterval(() => {
            const newCurrent = currentFade - 1 < 0 ? IMAGES_COUNT : currentFade - 1
            const nextCurrent = newCurrent - 1 < 0 ? IMAGES_COUNT : newCurrent - 1
            setCurrentFade(newCurrent)
            setNextFade(nextCurrent)
        }, 10000)
        return () => {
            clearInterval(myInterval);
        };
    }, [currentFade]);

    const getStyle = (index: number) => {
        return classnames(styles.cover, {
            [styles.fadeOut]: currentFade === index,
            [styles.fadeIn]: nextFade === index
        })
    }

    return (
        <div className={styles.container}>
            <img className={styles.baseImage} src={MOBILE_PHONE_GRID} alt="mobile phone grid" />
            {
                SCREEN_IMAGES.map((image, i) => (<img key={image} className={getStyle(i)} src={image} alt="app screens" />))
            }
        </div>
    )
}
