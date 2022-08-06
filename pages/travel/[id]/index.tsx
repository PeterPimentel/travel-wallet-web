import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { InferGetServerSidePropsType } from 'next'

import { withSession } from "../../../src/lib/withSession"
import useTravels from '../../../src/hooks/useTravels';
import { getSelectedTravel } from '../../../src/util';

import { NextPageWithLayout } from '../../_app';
import { ExpenseList } from "../../../src/components/organism/ExpenseList/ExpenseList";
import TravelPageLayout from '../../../src/components/organism/TravelPageLayout/TravelPageLayout';

const TravelPage: NextPageWithLayout = ({ }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();

    const { data } = useTravels()
    const { expenses } = getSelectedTravel(data, Number(router.query.id))

    return <ExpenseList expenses={expenses} />
}

TravelPage.getLayout = function getLayout(page) {
    return (
        <TravelPageLayout>
            {page}
        </TravelPageLayout>
    )
}

export const getServerSideProps = (withSession(async function ({
    locale,
    req,
}) {

    return {
        props: {
            session: req.session,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}))

export default TravelPage;

