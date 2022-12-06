import { useCallback } from "react";
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";
import { useStoreActions } from "easy-peasy";

import { TravelRequest } from "../../../src/types/ApiType";
import { withSession } from "../../../src/lib/withSession";
import { NextPageWithLayout } from "../../_app";
import useTravels from "../../../src/hooks/useTravels";
import { getSelectedTravel, getTravelsURL, getTravelURL } from "../../../src/util";
import { StoreActions } from "../../../src/types/StoreType";
import { common } from "../../../src/constants/locales";

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
            notification(t(common.updated_travel_success), "success")
            router.push(getTravelURL(travelId as string))
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [router, t, travelId, updateTravel])

    const handleRemove = useCallback(() => {
        deleteTravel(travelId).then(() => {
            notification(t(common.delete_travel_success), "success")
            router.push(getTravelsURL())
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
            headerLink={getTravelURL(router.query.id as string)}
            headerLinkText={t(common.cancel)}
            pageTitle={t(common.edit_travel)}
            travel={{
                name: data?.name,
                cover: data?.cover,
                budget: data.budget
            }}
            footer={<DangerZone resource={t(common.travel)} buttonText={t(common.delete_travel)} onClick={handleRemove} />}
            onSubmit={handleSubmit}
        />
    )
}

export const getServerSideProps = (withSession(async function ({
    req,
}) {

    return {
        props: {
            session: req.session,
        },
    }
}))

export default EditTravelPage;