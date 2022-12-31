import { FC, useCallback } from "react";
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";

import { APIError, TravelRequest } from "../../src/types/ApiType";
import { withSessionHOC } from "../../src/lib/withSessionHOC";
import { StoreActions } from "../../src/types/StoreType";
import { common } from "../../src/constants/locales";
import { getTravelsURL } from "../../src/util";
import { getErrorTranslateKey } from "../../src/util/apiLocaleUtil";

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
            router.push(getTravelsURL())
        }).catch((err: APIError) => {
            notification(t(getErrorTranslateKey(err)), "error")
        })
    }, [router, saveTravels, t])

    return (
        <TravelEditTemplate
            headerLink={getTravelsURL()}
            headerLinkText={t(common.cancel)}
            pageTitle={t(common.add_travel)}
            onSubmit={handleSubmit}
        />
    )
}

export default withSessionHOC(AddTravelPage)