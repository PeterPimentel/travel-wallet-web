import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useTravels from "../../../../src/hooks/useTravels";
import { getSelectedTravel } from "../../../../src/util";
import { withSession } from "../../../../src/lib/withSession";

import TravelPageLayout from "../../../../src/components/organism/TravelPageLayout/TravelPageLayout";

import styles from "./style.module.css"

const TravelMap = dynamic(() => import("../../../../src/components/organism/TravelMap/TravelMap"), {
    ssr: false,
});

const OverviewPage = () => {
    const router = useRouter();

    const { data } = useTravels()
    const { expenses } = getSelectedTravel(data, Number(router.query.id))

    return (
        <div className={styles.page}>
            <TravelMap expenses={expenses} />
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
