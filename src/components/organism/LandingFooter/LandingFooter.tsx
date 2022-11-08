import { FaInstagram } from "react-icons/fa"
import { BASE_COLORS } from "../../../constants"
import { SocialLink } from "../../../types/CMSType"

import { Text } from "../../atoms/Typography/Typography"
import { LogoWithName } from "../../molecules/LogoWithName/LogoWithName"

import styles from "./style.module.css"

type LandingFooterProps = {
    socialLinks: SocialLink[]
}

const SocialLink = ({ type }: { type: string }) => {
    switch (type) {
        case "instagram":
            return <FaInstagram style={{ color: BASE_COLORS.primary, fontSize: '32px' }} />
        default:
            return null;
    }
}

export const LandingFooter = ({ socialLinks }: LandingFooterProps) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.sideContent}>
                <LogoWithName size="regular" layout="horizontal" />
            </div>
            <div className={styles.centerContent}>
                <Text>© Copyright Travel Wallet. All Rights Reserved</Text>
            </div>
            <div className={styles.sideContent}>
                {
                    socialLinks.map((social, i) => (
                        <a key={i} href={social.link} target="blank">
                            <SocialLink type={social.type} />
                        </a>
                    ))
                }
            </div>
        </footer>
    )
}