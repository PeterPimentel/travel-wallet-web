import { FC, useCallback } from "react";
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";

import { TravelRequest } from "../../src/types/ApiType";
import { ROUTES } from "../../src/constants";
import { withSessionHOC } from "../../src/lib/withSessionHOC";
import { StoreActions } from "../../src/types/StoreType";
import { common } from "../../src/constants/locales";

import { TravelEditTemplate } from "../../src/components/templates/TravelEditTemplate/TravelEditTemplate";
import { notification } from "../../src/components/atoms/Notification/Notification";

const AddTravelPage: FC = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const saveTravels = useStoreActions<StoreActions>(
        (actions) => actions.createTravelRequest
    );

    const handleSubmit = useCallback((travel: TravelRequest) => {
        saveTravels({ name: travel.name, cover: travel.cover, budget: travel.budget }).then(() => {
            notification(t(common.travel_create_success), "success")
            router.push(`/${ROUTES.travel}`)
        }).catch((err: Error) => {
            notification(err.message, "error")
        })
    }, [router, saveTravels, t])

    return (
        <TravelEditTemplate
            headerLink={`/${ROUTES.travel}`}
            headerLinkText={t(common.cancel)}
            pageTitle={t(common.add_travel)}
            onSubmit={handleSubmit}
        />
    )
}

export default withSessionHOC(AddTravelPage)