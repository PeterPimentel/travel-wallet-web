import { useMemo, useState } from 'react';
import useTranslation from 'next-translate/useTranslation'

import { withSessionHOC } from "../../src/lib/withSessionHOC";
import { statistics } from "../../src/constants/locales";
import useTravels from "../../src/hooks/useTravels";
import {
    getAllExpenses,
    getExpensesYears,
    getFlightExpenses,
    getMapData,
    getTravelsURL,
    getVistedCountries
} from '../../src/util';

import { H5, Text } from "../../src/components/atoms/Typography/Typography";
import { CommonPageTemplate } from '../../src/components/templates/CommonPageTemplate/CommonPageTemplate';

import { Avatar } from '../../src/components/atoms/Avatar/Avatar';
import useFlags from '../../src/hooks/useFlags';
import { TrackerCardList } from '../../src/components/organism/TrackerCardList/TrackerCardList';
import { CountryProdium } from '../../src/components/organism/CountryPodium/CountryPodium';
import { TravelYearSelect } from '../../src/components/molecules/TravelYearSelect/TravelYearSelect';
import { PageLoader } from '../../src/components/molecules/PageLoader/PageLoader';

import styles from "./style.module.css"

const UserOverviewPage = () => {
    const [filter, setFilter] = useState("ALL")

    const { t } = useTranslation();

    const { data, isLoading } = useTravels()

    const expenses = getAllExpenses(data, filter)
    const total = getAllExpenses(data, "ALL")
    const cities = getMapData(expenses)
    const flights = getFlightExpenses(expenses)
    const countries = getVistedCountries(cities)

    const { data: flags } = useFlags(countries.length ? countries.map(c => c.code) : [])

    const filterOptions = useMemo(() => {
        return total ? getExpensesYears(total) : []
    }, [total])

    const countriesWithFlag = useMemo(() => {
        if (flags && flags.length && countries.length) {
            return countries.map((country) => {
                const flag = flags.find(f => f.code === country.code)

                return {
                    code: country.code,
                    country: country.name,
                    cities: country.cities,
                    flag: flag.flag,
                    value: country.cities.length
                }
            })
        }

        return []
    }, [countries, flags])

    if (isLoading) {
        return <PageLoader isLoading={isLoading} />
    }

    return (
        <CommonPageTemplate link={getTravelsURL()} showAppName={true}>
            <div className={`${styles.center} ${styles.avatar}`}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="extralarge" />
            </div>
            <div className={styles.filter}>
                <TravelYearSelect value={filter} options={filterOptions} onSelect={setFilter} />
            </div>
            <div className={styles.pageDescription}>
                <Text>{t(statistics.page_description)}</Text>
            </div>
            <div className={styles.center}>
                <TrackerCardList cities={cities.length} countries={countries.length} flights={flights.length} />
            </div>
            <div className={`${styles.center} ${styles.podium}`}>
                <div className={styles.podiumTitle}>
                    <H5>{t(statistics.ranking_country_city_visited_label)}</H5>
                </div>
                <CountryProdium items={countriesWithFlag.slice(0, 3)} />
            </div>
        </CommonPageTemplate>
    )
}

export default withSessionHOC(UserOverviewPage);
