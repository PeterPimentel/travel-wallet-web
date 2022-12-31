import { H3 } from "../../atoms/Typography/Typography"

import styles from "./style.module.css"

type PageTitleProps = {
    title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <div className={styles.title}>
            <H3>{title}</H3>
        </div>
    )
}