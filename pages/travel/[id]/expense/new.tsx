import { useCallback } from 'react';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { ExpenseRequest } from '../../../../src/types/ApiType';
import { getToken } from '../../../../src/service/token';
import { withSession } from '../../../../src/lib/withSession';
import { createExpense } from '../../../../src/service/expense';

import { EditExpenseTemplate } from '../../../../src/components/templates/ExpenseEditTemplate/EditExpenseTemplate';
import TravelPageLayout from '../../../../src/components/organism/TravelPageLayout/TravelPageLayout';
import { notification } from '../../../../src/components/atoms/Notification/Notification';

export const AddTravelPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const token = getToken();

    const handleSubmit = useCallback((expense: ExpenseRequest) => {
        const expenseRequest: ExpenseRequest = {
            ...expense,
            travelId: Number(router.query.id),
        }
        createExpense(token, expenseRequest).then(() => {
            notification(t("create_expense_success"), "success")
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [router.query.id, t, token])

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

