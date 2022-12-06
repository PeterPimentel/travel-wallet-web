import { FaUserCircle } from "react-icons/fa"

import { BASE_COLORS } from "../../../constants"
import { getProfileURL } from "../../../util"

import { AppLogo } from "../../atoms/AppLogo/AppLogo"
import { Badge } from "../../atoms/Badge/Badge"
import { CommonLink } from "../../atoms/CommonLink/CommonLink"

import styles from "./style.module.css"

type TravelListHeaderProps = {
    hasActions?: boolean;
}

export const TravelListHeader = ({ hasActions = false }: TravelListHeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <AppLogo />
                <div className={styles.headerContentAction}>
                    <Badge dot={hasActions}>
                        <CommonLink to={getProfileURL()}>
                            <FaUserCircle style={{ color: BASE_COLORS.primary, width: "24px", height: "24px" }} />
                        </CommonLink>
                    </Badge>
                </div>
            </div>
        </header>
    )
}