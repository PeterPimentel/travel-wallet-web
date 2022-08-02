import { useCallback } from 'react';
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { ExpenseRequest } from '../../../../src/types/ApiType';
import { getToken } from '../../../../src/service/token';
import { withSession } from '../../../../src/lib/withSession';
import { deleteExpense, updateExpense } from '../../../../src/service/expense';
import { ROUTES } from '../../../../src/constants';
import { formatDate } from '../../../../src/util/dateHelper';

import { EditExpenseTemplate } from '../../../../src/components/templates/ExpenseEditTemplate/EditExpenseTemplate';
import TravelPageLayout from '../../../../src/components/organism/TravelPageLayout/TravelPageLayout';
import { notification } from '../../../../src/components/atoms/Notification/Notification';
import { getTravel } from '../../../../src/service/travel';
import { DangerZone } from '../../../../src/components/molecules/DangerZone/DangerZone';

export const AddTravelPage = ({ expense }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const token = getToken();

    const travelId = router.query.id;
    const expenseId = router.query.expenseId;

    const handleSubmit = useCallback((expense: ExpenseRequest) => {
        const expenseRequest: ExpenseRequest = {
            ...expense,
            travelId: Number(travelId),
        }
        updateExpense(token, Number(expenseId), expenseRequest).then(() => {
            notification(t("update_expense_success"), "success")
            router.push(`/${ROUTES.travel}/${travelId}`)
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [expenseId, router, t, token, travelId])

    const handleRemove = useCallback(() => {
        deleteExpense(token, Number(expenseId)).then(() => {
            notification(t("delete_expense_success"), "success")
            router.push(`/${ROUTES.travel}/${travelId}`)
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [expenseId, router, t, token, travelId])

    return <EditExpenseTemplate
        expense={{ ...expense, date: formatDate(new Date(expense.date)) }}
        headerText={t("edit_expense")}
        onSubmit={handleSubmit}
        footer={<DangerZone buttonText={t("delete_expense")} onClick={handleRemove} />}
    />
}

AddTravelPage.getLayout = function getLayout(page) {
    return (
        <TravelPageLayout>
            {page}
        </TravelPageLayout>
    )
}

export const getServerSideProps = (withSession(async function (ctx) {
    const token = getToken(ctx);
    const { id, expenseId } = ctx.query

    const travel = await getTravel(token)(`/travel/${id}`)

    const expenses = travel ? travel.expenses : []
    const expense = expenses.find((e) => e.id === Number(expenseId))

    if (!expense) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            session: ctx.req.session,
            expense,
            ...(await serverSideTranslations(ctx.locale, ['common'])),
        },
    }
}))

export default AddTravelPage;

