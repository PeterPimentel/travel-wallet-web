import { FC } from "react";

import styles from "./style.module.css";

interface AppLogoProps {
    size?: "small" | "regular" | "large";
    variant?: "regular" | "white";
}

export const AppLogo = ({ size = "regular", variant = "regular" }: AppLogoProps) => {
    const source = variant === "regular" ? "/assets/logo.png" : "/assets/logo_white.png";

    // eslint-disable-next-line @next/next/no-img-element
    return <img className={styles[size]} src={source} alt="App logo" />
}