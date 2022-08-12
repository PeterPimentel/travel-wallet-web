import { useCallback } from 'react';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { ExpenseRequest } from '../../../../src/types/ApiType';
import { getToken } from '../../../../src/service/token';
import { withSession } from '../../../../src/lib/withSession';
// import { createExpense } from '../../../../src/service/expense';
import { ROUTES } from '../../../../src/constants';
import { useStoreActions } from 'easy-peasy';
import { StoreActions } from '../../../../src/types/StoreType';

import { EditExpenseTemplate } from '../../../../src/components/templates/ExpenseEditTemplate/EditExpenseTemplate';
import TravelPageLayout from '../../../../src/components/organism/TravelPageLayout/TravelPageLayout';
import { notification } from '../../../../src/components/atoms/Notification/Notification';

export const AddTravelPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const createExpense = useStoreActions<StoreActions>(
        (actions) => actions.createExpenseRequest
    );

    const token = getToken();
    const travelId = router.query.id;

    const handleSubmit = useCallback((expense: ExpenseRequest) => {
        createExpense({
            ...expense,
            travelId: Number(travelId),
        }).then((data) => {
            console.log("Data", data)
            notification(t("expense_create_success"), "success")
            router.push(`/${ROUTES.travel}/${travelId}`)
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [travelId, createExpense, t, router])

    return <EditExpenseTemplate headerText={t("add_expense")} onSubmit={handleSubmit} />
}

AddTravelPage.getLayout = function getLayout(page) {
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

export default AddTravelPage;

