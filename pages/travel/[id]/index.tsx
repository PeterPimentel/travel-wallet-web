import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTravel } from "../../../src/hooks/useTravel";

import { NextPageWithLayout } from '../../_app';
import { ExpenseList } from "../../../src/components/organism/ExpenseList/ExpenseList";
import TravelPageLayout from '../../../src/components/organism/TravelPageLayout/TravelPageLayout';


export const TravelPage: NextPageWithLayout = () => {
    const route = useRouter();

    const { data } = useTravel(Number(route.query.id));

    const expenses = data ? data.expenses : []

    return <ExpenseList expenses={expenses} />
}
// export const TravelPage: NextPageWithLayout = () => {
//     const route = useRouter();

//     const { data, isLoading } = useTravel(Number(route.query.id));

//     const expenses = data ? data.expenses : []
//     const travel = data ? data : { name: "" }

//     if (isLoading) {
//         return <PageLoader isLoading={isLoading} />
//     }

//     return <div className={commonStyle.page}>
//         <TravelHeader name={travel.name} expenses={expenses} />
//         <div className={commonStyle.pageContent}>
//             <ExpenseList expenses={expenses} />
//         </div>
//         <TravelFooter id={route.query.id as string} />
//     </div>
// }

TravelPage.getLayout = function getLayout(page) {
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

export default TravelPage;

