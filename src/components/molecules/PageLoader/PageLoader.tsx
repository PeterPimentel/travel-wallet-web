import { FC } from "react";

import { Loading } from "../../atoms/Loading/Loading"

import styles from "./style.module.css";

interface PageLoaderProps {
    isLoading?: boolean;
}

export const PageLoader: FC<PageLoaderProps> = ({ isLoading = false }) => {
    return (
        <div className={styles.loader}>
            <Loading loading={isLoading} size="large" />
        </div>
    )
}