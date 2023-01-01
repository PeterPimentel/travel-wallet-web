import { getProfileURL } from "../../../util"

import { AppLogo } from "../../atoms/AppLogo/AppLogo"
import { Avatar } from "../../atoms/Avatar/Avatar"
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
                            <Avatar size="small" />
                        </CommonLink>
                    </Badge>
                </div>
            </div>
        </header>
    )
}