import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useTravels } from "../../src/hooks/useTravel";
import { ROUTES } from "../../src/constants";
import { withSessionHOC } from "../../src/lib/withSessionHOC";

import { CommonLink } from "../../src/components/atoms/CommonLink/CommonLink";
import { Loading } from "../../src/components/atoms/Loading/Loading";
import { H5, Text } from "../../src/components/atoms/Typography/Typography";
import { AppLogo } from "../../src/components/atoms/AppLogo/AppLogo";
import { AddTravelButton } from "../../src/components/molecules/AddTravelButton/AddTravelButton";
import { TravelCard } from "../../src/components/organism/TravelCard/TravelCard";

import styles from "./style.module.css"

const TravelsPage = ({ session }) => {
    const { t } = useTranslation();

    const { data, isLoading } = useTravels()

    return <div className={styles.page}>
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <AppLogo />
                <CommonLink to={`/${ROUTES.profile}`}>
                    <FaUserCircle style={{ width: "24px", height: "24px" }} />
                </CommonLink>
            </div>
        </header>
        <div className={styles.pageContent}>
            <div>
                <H5>{t("welcome_message")}</H5>
                <Text>{session?.username}</Text>
            </div>
            <CommonLink to={`/${ROUTES.travel}/new`}>
                <AddTravelButton />
            </CommonLink>
            <div className={styles.travels}>
                {isLoading ? <Loading loading={isLoading} size="large" /> : null}
                {(data || []).map(travel => (
                    <div key={travel.id} className={styles.travelCard}>
                        <CommonLink to={`/${ROUTES.travel}/${travel.id}`}>
                            <TravelCard title={travel.name} cover={travel.cover} expenses={travel.expenses} />
                        </CommonLink>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default withSessionHOC(TravelsPage);
