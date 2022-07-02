import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { ROUTES } from "../../../src/constants";
import useAuth from "../../../src/hooks/useAuth";
import { createTravel } from "../../../src/service/travel";
import { TravelRequest } from "../../../src/types/ApiType";

import { TravelEditTemplate } from "../../../src/components/templates/TravelEditTemplate/TravelEditTemplate";
import { notification } from "../../../src/components/atoms/Notification/Notification";
import { DangerZone } from "../../../src/components/molecules/DangerZone/DangerZone";
import { useTravel } from "../../../src/hooks/useTravel";
import { PageLoader } from "../../../src/components/molecules/PageLoader/PageLoader";

const AddTravelPage: FC = () => {
    const { t } = useTranslation();
    const { auth } = useAuth({
        redirectTo: `/${ROUTES.signin}`,
    })
    const route = useRouter();

    const { data, isLoading } = useTravel(Number(route.query.travelId), auth?.token);


    const handleSubmit = useCallback((travel: TravelRequest) => {
        createTravel(auth?.token, { name: travel.name, cover: travel.cover }).then((res) => {
            notification(t("created_travel_success"), "success")
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [auth?.token, t])

    if (isLoading) {
        return <PageLoader isLoading={isLoading} />
    }

    return (
        <TravelEditTemplate
            headerLink={`/${ROUTES.travel}/${route.query.travelId}`}
            headerLinkText={t("cancel")}
            pageTitle={t("edit_travel")}
            travel={{
                name: data?.name,
                cover: data?.cover
            }}
            footer={<DangerZone buttonText={t("delete_travel")} onClick={() => console.log("click")} />}
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