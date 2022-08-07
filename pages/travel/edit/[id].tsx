import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import { useStoreActions } from "easy-peasy";

import { ROUTES } from "../../../src/constants";
import { TravelRequest } from "../../../src/types/ApiType";
import { withSession } from "../../../src/lib/withSession";
import { NextPageWithLayout } from "../../_app";
import useTravels from "../../../src/hooks/useTravels";
import { getSelectedTravel } from "../../../src/util";
import { StoreActions } from "../../../src/types/StoreType";

import { TravelEditTemplate } from "../../../src/components/templates/TravelEditTemplate/TravelEditTemplate";
import { notification } from "../../../src/components/atoms/Notification/Notification";
import { DangerZone } from "../../../src/components/molecules/DangerZone/DangerZone";
import { PageLoader } from "../../../src/components/molecules/PageLoader/PageLoader";
import { NotFoundTemplate } from "../../../src/components/templates/NotFoundTemplate/NotFoundTemplate";

const EditTravelPage: NextPageWithLayout = ({ session }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation();
    const router = useRouter();

    const updateTravel = useStoreActions<StoreActions>(
        (actions) => actions.updateTravelRequest
    );
    const deleteTravel = useStoreActions<StoreActions>(
        (actions) => actions.deleteTravelRequest
    );
    const { data: travels, isLoading } = useTravels()

    const travelId = router.query.id;

    const { travel: data, hasTravel } = getSelectedTravel(travels, Number(travelId))

    const handleSubmit = useCallback((travel: TravelRequest) => {
        updateTravel({ id: travelId, name: travel.name, cover: travel.cover, budget: travel.budget }).then(() => {
            notification(t("updated_travel_success"), "success")
            router.push(`/${ROUTES.travel}/${travelId}`)
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [router, t, travelId, updateTravel])

    const handleRemove = useCallback(() => {
        deleteTravel(travelId).then(() => {
            notification(t("delete_travel_success"), "success")
            router.push(`/${ROUTES.travel}`)
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [deleteTravel, router, t, travelId])

    if (isLoading) {
        return <PageLoader isLoading={isLoading} />
    }

    if (!hasTravel) {
        return <NotFoundTemplate />
    }

    return (
        <TravelEditTemplate
            headerLink={`/${ROUTES.travel}/${router.query.id}`}
            headerLinkText={t("cancel")}
            pageTitle={t("edit_travel")}
            travel={{
                name: data?.name,
                cover: data?.cover,
                budget: data.budget
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