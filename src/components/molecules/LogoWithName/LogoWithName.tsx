import classname from "classnames";

import { APP_NAME } from "../../../constants";
import { LogoSize } from "../../../types/CommonType";
import { getLandingURL } from "../../../util";

import { AppLogo } from "../../atoms/AppLogo/AppLogo";
import { CommonLink } from "../../atoms/CommonLink/CommonLink";

import styles from "./style.module.css"

type LogoWithNameProps = {
    size: LogoSize;
    layout: "vertical" | "horizontal"
}

export const LogoWithName = ({ size, layout }: LogoWithNameProps) => {
    const textStyle = classname(styles.text, styles[size])
    const containerStyle = classname(styles.logoContainer, styles[layout])

    return (
        <CommonLink to={getLandingURL()}>
            <div className={containerStyle}>
                <AppLogo size={size} />
                <span className={textStyle}>{APP_NAME}</span>
            </div>
        </CommonLink>
    )
}