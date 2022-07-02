import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import { useTravel } from "../../../../src/hooks/useTravel";
import { getDailyExpenses } from "../../../../src/util/chartUtil";

import { BarChart } from "../../../../src/components/atoms/BarChart/BarChart";
import { CategoryPieChart } from "../../../../src/components/molecules/CategoryPieChart/CategoryPieChart";
import TravelPageLayout from "../../../../src/components/organism/TravelPageLayout/TravelPageLayout";

import styles from "./style.module.css"

const OverviewPage = () => {
    const router = useRouter();

    const { data } = useTravel(Number(router.query.id));

    const expenses = data ? data.expenses : []
    const barData = getDailyExpenses(expenses)

    return (
        <div>
            <div className={styles.chartContainer}>
                <div className={styles.chart}>
                    <BarChart data={barData} color="#5377F0" />
                </div>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chart}>
                    <CategoryPieChart expenses={expenses} />
                </div>
            </div>
        </div>
    )
}

OverviewPage.getLayout = function getLayout(page) {
    return (
        <TravelPageLayout>
            {page}
        </TravelPageLayout>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
        },
    };
}

export default OverviewPage;