import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { ROUTES } from "../../../src/constants";
import { TravelRequest } from "../../../src/types/ApiType";

import { TravelEditTemplate } from "../../../src/components/templates/TravelEditTemplate/TravelEditTemplate";
import { notification } from "../../../src/components/atoms/Notification/Notification";
import { DangerZone } from "../../../src/components/molecules/DangerZone/DangerZone";
import { useTravel } from "../../../src/hooks/useTravel";
import { PageLoader } from "../../../src/components/molecules/PageLoader/PageLoader";
import TravelPageLayout from "../../../src/components/organism/TravelPageLayout/TravelPageLayout";
import { withSession } from "../../../src/lib/withSession";
import { InferGetServerSidePropsType } from "next";
import { NextPageWithLayout } from "../../_app";

const EditTravelPage: NextPageWithLayout = ({ }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation();
    const router = useRouter();

    const { data, isLoading } = useTravel(Number(router.query.id));


    const handleSubmit = useCallback((travel: TravelRequest) => {
        // createTravel(auth?.token, { name: travel.name, cover: travel.cover }).then((res) => {
        //     notification(t("created_travel_success"), "success")
        // }).catch((err) => {
        //     notification(err.message, "error")
        // })
    }, [])

    return (
        <TravelEditTemplate
            headerLink={`/${ROUTES.travel}/${router.query.id}`}
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

EditTravelPage.getLayout = function getLayout(page) {
    return (
        <TravelPageLayout>
            {page}
        </TravelPageLayout>
    )
}

export const getServerSideProps = (withSession(async function ({
    locale,
    req,
}) {

    return {
        props: {
            session: req.session,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}))

export default EditTravelPage;