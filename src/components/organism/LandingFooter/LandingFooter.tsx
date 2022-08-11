import { FaInstagram } from "react-icons/fa"

import { Text } from "../../atoms/Typography/Typography"
import { LogoWithName } from "../../molecules/LogoWithName/LogoWithName"

import styles from "./style.module.css"

export const LandingFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.sideContent}>
                <LogoWithName size="regular" layout="horizontal" />
            </div>
            <div className={styles.centerContent}>
                <Text>© Copyright Travel Wallet. All Rights Reserved</Text>
            </div>
            <div className={styles.sideContent}>
                <a href="https://www.instagram.com/" target="blank">
                    <FaInstagram style={{ color: "#5377F0", fontSize: '32px' }} />
                </a>
            </div>
        </footer>
    )
}