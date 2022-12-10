import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import useTravels from "../../../../src/hooks/useTravels";
import { getSelectedTravel } from "../../../../src/util";
import { withSession } from "../../../../src/lib/withSession";
import { overview } from "../../../../src/constants/locales";

import { Text } from "../../../../src/components/atoms/Typography/Typography";
import { CategoryPieChart } from "../../../../src/components/molecules/CategoryPieChart/CategoryPieChart";
import { DayliExpensesBardChart } from "../../../../src/components/molecules/DayliExpenseBarChart/DayliExpenseBarChart";
import { ExpensesCategoryList } from "../../../../src/components/molecules/ExpensesCategoryList/ExpensesCategoryList";
import TravelPageLayout from "../../../../src/components/organism/TravelPageLayout/TravelPageLayout";

import styles from "./style.module.css"

const OverviewPage = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { data } = useTravels()
    const { expenses } = getSelectedTravel(data, Number(router.query.id))

    return (
        <div className={styles.page}>
            <div className={styles.chartContainer}>
                <DayliExpensesBardChart expenses={expenses} />
            </div>
            <div className={styles.chartContainer}>
                <CategoryPieChart expenses={expenses} />
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.category}>
                    <div className={styles.title}>
                        <Text>{t(overview.expenses_by_category)}</Text>
                    </div>
                    <ExpensesCategoryList expenses={expenses} />
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
