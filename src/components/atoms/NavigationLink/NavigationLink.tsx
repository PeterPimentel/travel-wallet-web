import { ReactNode } from "react"
import Link from 'next/link'
import classname from "classnames"

import styles from "./style.module.css"

interface NavigationLinkProps {
    children: string | ReactNode;
    to: string;
    active?: boolean;
}

export const NavigationLink = ({ children, to, active = false }: NavigationLinkProps) => {
    return (
        <Link href={to} >
            <a className={classname(styles.link, { [styles.active]: active })}>
                {children}
            </a>
        </Link>
    )
}