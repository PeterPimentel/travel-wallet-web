import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { CommonLink } from "../../atoms/CommonLink/CommonLink";
import { AppLogo } from "../../atoms/AppLogo/AppLogo";

import styles from "./style.module.css"

interface BasicHeaderProps {
    link: string;
    linkText: string;
}

export const BasicHeader: FC<BasicHeaderProps> = ({ link, linkText }) => {
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <FaArrowLeft color="white" />
                <CommonLink color="white" to={link}>{linkText}</CommonLink>
            </nav>
            <div className={styles.logo}>
                <AppLogo variant="white" />
            </div>
        </header>
    )
}