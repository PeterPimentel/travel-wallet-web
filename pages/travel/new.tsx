import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";

import { TravelRequest } from "../../src/types/ApiType";
import { ROUTES } from "../../src/constants";
import { withSessionHOC } from "../../src/lib/withSessionHOC";
import { StoreActions } from "../../src/types/StoreType";

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
            notification(t("travel_create_success"), "success")
            router.push(`/${ROUTES.travel}`)
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [router, saveTravels, t])

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