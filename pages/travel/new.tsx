import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { TravelRequest } from "../../src/types/ApiType";
import { ROUTES } from "../../src/constants";
import { createTravel } from "../../src/service/travel";
import { withSessionHOC } from "../../src/lib/withSessionHOC";

import { TravelEditTemplate } from "../../src/components/templates/TravelEditTemplate/TravelEditTemplate";
import { notification } from "../../src/components/atoms/Notification/Notification";
import { getToken } from "../../src/service/token";

const AddTravelPage: FC = () => {
    const { t } = useTranslation();
    const token = getToken();
    const router = useRouter();

    const handleSubmit = useCallback((travel: TravelRequest) => {
        createTravel(token, { name: travel.name, cover: travel.cover, budget: travel.budget }).then((res) => {
            notification(t("created_travel_success"), "success")
            router.push(`/${ROUTES.travel}`)
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [router, t, token])

    return (
        <TravelEditTemplate
            headerLink={`/${ROUTES.travel}`}
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

export default withSessionHOC(AddTravelPage)