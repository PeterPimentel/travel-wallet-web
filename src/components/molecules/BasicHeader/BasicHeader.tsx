import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { CommonLink } from "../../atoms/CommonLink/CommonLink";
import { Text } from "../../atoms/Typography/Typography";
import { AppLogo } from "../../atoms/AppLogo/AppLogo";
import { APP_NAME } from "../../../constants";

import styles from "./style.module.css"

interface BasicHeaderProps {
    link: string;
    linkText: string;
    showAppName?: boolean;
}

export const BasicHeader: FC<BasicHeaderProps> = ({ link, linkText, showAppName = false }) => {
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <FaArrowLeft color="white" />
                <CommonLink color="white" to={link}>{linkText}</CommonLink>
            </nav>
            <div className={styles.logo}>
                <AppLogo variant="white" />
                {showAppName ? <Text>{APP_NAME}</Text> : null}
            </div>
        </header>
    )
}