import useTranslation from 'next-translate/useTranslation'

import { withSessionHOC } from "../../src/lib/withSessionHOC";
import { common } from "../../src/constants/locales";
import useTravels from "../../src/hooks/useTravels";
import { getTravelURL } from '../../src/util';

import { CommonLink } from "../../src/components/atoms/CommonLink/CommonLink";
import { Loading } from "../../src/components/atoms/Loading/Loading";
import { H5, Text } from "../../src/components/atoms/Typography/Typography";
import { TravelListHeader } from "../../src/components/molecules/TravelListHeader/TravelListHeader";
import { AddTravelButton } from "../../src/components/molecules/AddTravelButton/AddTravelButton";
import { TravelCard } from "../../src/components/organism/TravelCard/TravelCard";

import styles from "./style.module.css"

const TravelsPage = (props) => {
    const { t } = useTranslation();
    const { data, isLoading } = useTravels()

    return <div className={styles.page}>
        <TravelListHeader hasActions={!props.data?.active} />
        <div className={styles.pageContent}>
            <div>
                <H5>{t(common.welcome_message)}</H5>
                <Text>{props.data?.username}</Text>
            </div>
            <CommonLink to={getTravelURL('new')}>
                <AddTravelButton />
            </CommonLink>
            <div className={styles.travels}>
                {isLoading ? <Loading loading={isLoading} size="large" /> : null}
                {(data || []).map(travel => (
                    <div key={travel.id} className={styles.travelCard}>
                        <CommonLink to={getTravelURL(travel.id)}>
                            <TravelCard title={travel.name} cover={travel.cover} shared={travel.shared} expenses={travel.expenses} />
                        </CommonLink>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default withSessionHOC(TravelsPage);
