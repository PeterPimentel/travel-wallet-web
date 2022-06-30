import { FC, ReactNode } from "react";

import { TravelRequest } from "../../../types/ApiType";
import { Travel } from "../../../types/TravelType";

import { H3 } from "../../atoms/Typography/Typography";
import { BasicHeader } from "../../molecules/BasicHeader/BasicHeader";
import { TravelForm } from "../../organism/TraveForm/TravelForm";

import styles from "./style.module.css"


interface TravelEditTemplateProps {
    headerLink: string;
    headerLinkText: string;
    pageTitle: string;
    travel?: Omit<Travel, "id" | "expenses">;
    footer?: ReactNode;
    onSubmit: (travel: TravelRequest) => void
}

export const TravelEditTemplate: FC<TravelEditTemplateProps> = ({ headerLink, headerLinkText, pageTitle, travel, footer, onSubmit }) => {
    return (
        <div className={styles.page}>
            <BasicHeader link={headerLink} linkText={headerLinkText} />
            <div className={styles.content}>
                <div className={styles.title}>
                    <H3>{pageTitle}</H3>
                </div>
                <TravelForm
                    initialName={travel?.name}
                    initialCover={travel?.cover}
                    onSubmit={onSubmit}
                />
                {footer}
            </div>
        </div>
    )
}