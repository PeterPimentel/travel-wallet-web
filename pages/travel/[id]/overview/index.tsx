import { useRouter } from "next/router";

import { getDailyExpenses } from "../../../../src/util/chartUtil";
import useTravels from "../../../../src/hooks/useTravels";
import { getSelectedTravel } from "../../../../src/util";
import { withSession } from "../../../../src/lib/withSession";

import { BarChart } from "../../../../src/components/atoms/BarChart/BarChart";
import { CategoryPieChart } from "../../../../src/components/molecules/CategoryPieChart/CategoryPieChart";
import TravelPageLayout from "../../../../src/components/organism/TravelPageLayout/TravelPageLayout";

import styles from "./style.module.css"

const OverviewPage = () => {
    const router = useRouter();

    const { data } = useTravels()
    const { expenses } = getSelectedTravel(data, Number(router.query.id))

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

export const getServerSideProps = (withSession(async function (ctx) {
    return {
        props: {
            session: ctx.req.session,
        },
    }
}))

export default OverviewPage;
