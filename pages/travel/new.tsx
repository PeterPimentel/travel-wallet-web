import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { TravelRequest } from "../../src/types/ApiType";

import { TravelEditTemplate } from "../../src/components/templates/TravelEditTemplate/TravelEditTemplate";

const AddTravelPage: FC = () => {
    const { t } = useTranslation();

    const handleSubmit = useCallback((travel: TravelRequest) => {
        console.log("Called", travel)
    }, [])

    return (
        <TravelEditTemplate
            headerLink="/travel"
            headerLinkText={t("cancel")}
            pageTitle={t("add_travel")}
            onSubmit={handleSubmit}
        />
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default AddTravelPage