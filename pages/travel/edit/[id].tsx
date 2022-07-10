import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Router, { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";

import { ROUTES } from "../../../src/constants";
import { TravelRequest } from "../../../src/types/ApiType";
import { withSession } from "../../../src/lib/withSession";
import { useTravel } from "../../../src/hooks/useTravel";
import { NextPageWithLayout } from "../../_app";
import { getToken } from "../../../src/service/token";
import { updateTravel, deleteTravel } from "../../../src/service/travel";

import { TravelEditTemplate } from "../../../src/components/templates/TravelEditTemplate/TravelEditTemplate";
import { notification } from "../../../src/components/atoms/Notification/Notification";
import { DangerZone } from "../../../src/components/molecules/DangerZone/DangerZone";
import { PageLoader } from "../../../src/components/molecules/PageLoader/PageLoader";

const EditTravelPage: NextPageWithLayout = ({ session }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [headerLinkLlabel, setHeaderLinkLlabel] = useState<string>("cancel")

    const { t } = useTranslation();
    const router = useRouter();
    const token = getToken();
    const { data, isLoading } = useTravel(Number(router.query.id));

    const handleSubmit = useCallback((travel: TravelRequest) => {
        updateTravel(token, data?.id, { name: travel.name, cover: travel.cover }).then(() => {
            notification(t("updated_travel_success"), "success")
            setHeaderLinkLlabel("back")
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [data?.id, t, token])

    const handleRemove = useCallback(() => {
        deleteTravel(token, data?.id).then(() => {
            notification(t("deleted_travel_success"), "success")
            Router.push(`/${ROUTES.travel}`)
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [data?.id, t, token])

    if (isLoading) {
        return <PageLoader isLoading={isLoading} />
    }

    return (
        <TravelEditTemplate
            headerLink={`/${ROUTES.travel}/${router.query.id}`}
            headerLinkText={t(headerLinkLlabel)}
            pageTitle={t("edit_travel")}
            travel={{
                name: data?.name,
                cover: data?.cover
            }}
            footer={<DangerZone buttonText={t("delete_travel")} onClick={handleRemove} />}
            onSubmit={handleSubmit}
        />
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