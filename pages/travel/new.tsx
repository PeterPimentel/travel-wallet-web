import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { TravelRequest } from "../../src/types/ApiType";
import { ROUTES } from "../../src/constants";
import { createTravel } from "../../src/service/travel";
import useAuth from "../../src/hooks/useAuth";

import { TravelEditTemplate } from "../../src/components/templates/TravelEditTemplate/TravelEditTemplate";
import { notification } from "../../src/components/atoms/Notification/Notification";

const AddTravelPage: FC = () => {
    const { t } = useTranslation();
    const { auth } = useAuth({
        redirectTo: `/${ROUTES.signin}`,
    })

    const handleSubmit = useCallback((travel: TravelRequest) => {
        createTravel(auth?.token, { name: travel.name, cover: travel.cover }).then((res) => {
            notification(t("created_travel_success"), "success")
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [auth?.token, t])

    return (
        <TravelEditTemplate
            headerLink={`/${ROUTES.travel}`}
            headerLinkText={t("back")}
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