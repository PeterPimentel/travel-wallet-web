import { useCallback } from 'react';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { ExpenseRequest } from '../../../../src/types/ApiType';

import { EditExpenseTemplate } from '../../../../src/components/templates/ExpenseEditTemplate/EditExpenseTemplate';
import TravelPageLayout from '../../../../src/components/organism/TravelPageLayout/TravelPageLayout';

export const AddTravelPage = () => {
    const route = useRouter();
    const { t } = useTranslation();

    const handleSubmit = useCallback((expense: ExpenseRequest) => {
        const expenseRequest: ExpenseRequest = {
            ...expense,
            travelId: route.query.id as string,
        }
        console.log("Called", expenseRequest)
    }, [route.query.id])

    return <EditExpenseTemplate headerText={t("add_expense")} onSubmit={handleSubmit} />
}
// export const AddTravelPage = () => {
//     const route = useRouter();
//     const { t } = useTranslation();

//     const { data } = useTravel(Number(route.query.id));

//     const expenses = data ? data.expenses : []
//     const travel = data ? data : { name: "" }

//     const handleSubmit = useCallback((expense: ExpenseRequest) => {
//         const expenseRequest: ExpenseRequest = {
//             ...expense,
//             travelId: route.query.id as string,
//         }
//         console.log("Called", expenseRequest)
//     }, [route.query.id])

//     return <div className={commonStyle.page}>
//         <TravelHeader name={travel.name} expenses={expenses} />
//         <div className={commonStyle.pageContent}>
//             <EditExpenseTemplate
//                 headerText={t("add_expense")}
//                 onSubmit={handleSubmit}
//             />
//         </div>
//         <TravelFooter id={route.query.id as string} />
//     </div>
// }

AddTravelPage.getLayout = function getLayout(page) {
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

export default AddTravelPage;

