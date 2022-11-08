/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import classnames from "classnames";

import styles from "./style.module.css"

type AppScreensProps = {
    images: string[]
    cover: string
}

export const AppScreens = ({ images, cover }: AppScreensProps) => {
    const imagesSize = images.length - 1;

    const [currentFade, setCurrentFade] = useState(imagesSize) // Last Index
    const [nextFade, setNextFade] = useState(imagesSize - 1) // First Index

    useEffect(() => {
        let myInterval = setInterval(() => {
            const newCurrent = currentFade - 1 < 0 ? imagesSize : currentFade - 1
            const nextCurrent = newCurrent - 1 < 0 ? imagesSize : newCurrent - 1
            setCurrentFade(newCurrent)
            setNextFade(nextCurrent)
        }, 10000)
        return () => {
            clearInterval(myInterval);
        };
    }, [currentFade, imagesSize]);

    const getStyle = (index: number) => {
        return classnames(styles.cover, {
            [styles.fadeOut]: currentFade === index,
            [styles.fadeIn]: nextFade === index
        })
    }

    return (
        <div className={styles.container}>
            <img className={styles.baseImage} src={cover} alt="mobile phone grid" />
            {
                images.map((image, i) => (<img key={image} className={getStyle(i)} src={image} alt="app screens" />))
            }
        </div>
    )
}
