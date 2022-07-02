import { useCallback } from 'react';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { ExpenseRequest } from '../../../../src/types/ApiType';

import { EditExpenseTemplate } from '../../../../src/components/templates/ExpenseEditTemplate/EditExpenseTemplate';
import TravelPageLayout from '../../../../src/components/organism/TravelPageLayout/TravelPageLayout';

export const AddTravelPage = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const handleSubmit = useCallback((expense: ExpenseRequest) => {
        const expenseRequest: ExpenseRequest = {
            ...expense,
            travelId: router.query.id as string,
        }
        console.log("Called", expenseRequest)
    }, [router.query.id])

    return <EditExpenseTemplate headerText={t("add_expense")} onSubmit={handleSubmit} />
}

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

