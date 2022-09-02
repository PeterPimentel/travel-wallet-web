import { useRouter } from "next/router";

import useTravels from "../../../../src/hooks/useTravels";
import { getSelectedTravel } from "../../../../src/util";
import { withSession } from "../../../../src/lib/withSession";

import { CategoryPieChart } from "../../../../src/components/molecules/CategoryPieChart/CategoryPieChart";
import TravelPageLayout from "../../../../src/components/organism/TravelPageLayout/TravelPageLayout";
import { DayliExpensesBardChart } from "../../../../src/components/molecules/DayliExpenseBarChart/DayliExpenseBarChart";

import styles from "./style.module.css"

const OverviewPage = () => {
    const router = useRouter();

    const { data } = useTravels()
    const { expenses } = getSelectedTravel(data, Number(router.query.id))

    return (
        <div>
            <div className={styles.chartContainer}>
                <DayliExpensesBardChart expenses={expenses} />
            </div>
            <div className={styles.chartContainer}>
                <CategoryPieChart expenses={expenses} />
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
