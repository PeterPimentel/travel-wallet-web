import { FC, ReactNode } from "react";

import { TravelRequest } from "../../../types/ApiType";
import { Travel } from "../../../types/TravelType";

import { PageTitle } from "../../molecules/PageTitle/PageTitle";
import { TravelForm } from "../../organism/TraveForm/TravelForm";
import { CommonPageTemplate } from "../CommonPageTemplate/CommonPageTemplate";

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
        <CommonPageTemplate link={headerLink} linkText={headerLinkText}>
            <div>
                <PageTitle title={pageTitle} />
                <TravelForm
                    initialName={travel?.name}
                    initialCover={travel?.cover}
                    initialBudget={travel?.budget}
                    onSubmit={onSubmit}
                />
                {footer}
            </div>
        </CommonPageTemplate>
    )
}
