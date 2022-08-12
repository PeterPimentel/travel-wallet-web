import { FC, ReactNode } from "react"
import Link from 'next/link'
import classname from "classnames"

import styles from "./style.module.css"

interface CommonLinkProps {
    children: string | ReactNode;
    to: string;
    color?: "white" | "blue" | "black";
}

export const CommonLink: FC<CommonLinkProps> = ({ children, to, color = "blue" }) => {
    const linkStyle = classname({
        [styles.white]: color === "white",
        [styles.black]: color === "black",
    })
    return (
        <Link href={to}>
            <a className={linkStyle}>{children}</a>
        </Link>
    )
}