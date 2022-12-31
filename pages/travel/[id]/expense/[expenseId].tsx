import { useCallback } from 'react';
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useStoreActions } from 'easy-peasy';

import { ExpenseRequest } from '../../../../src/types/ApiType';
import { withSession } from '../../../../src/lib/withSession';
import { formatDate } from '../../../../src/util/dateHelper';
import useTravels from '../../../../src/hooks/useTravels';
import { getSelectedTravel, getTravelURL } from '../../../../src/util';
import { StoreActions } from '../../../../src/types/StoreType';
import { common } from '../../../../src/constants/locales';
import { getErrorTranslateKey } from '../../../../src/util/apiLocaleUtil';

import { EditExpenseTemplate } from '../../../../src/components/templates/ExpenseEditTemplate/EditExpenseTemplate';
import TravelPageLayout from '../../../../src/components/organism/TravelPageLayout/TravelPageLayout';
import { notification } from '../../../../src/components/atoms/Notification/Notification';
import { DangerZone } from '../../../../src/components/molecules/DangerZone/DangerZone';

export const AddTravelPage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const deleteExpense = useStoreActions<StoreActions>(
        (actions) => actions.deleteExpenseRequest
    );
    const updateExpense = useStoreActions<StoreActions>(
        (actions) => actions.updateExpenseRequest
    );

    const travelId = router.query.id;
    const expenseId = router.query.expenseId;

    const { data } = useTravels()
    const { expenses } = getSelectedTravel(data, Number(router.query.id))
    const expense = expenses.find(e => e.id === Number(expenseId)) || { date: null }

    const handleSubmit = useCallback((expense: ExpenseRequest) => {
        updateExpense({
            ...expense,
            travelId: Number(travelId),
            id: Number(expenseId),
        }).then(() => {
            notification(t(common.update_expense_success), "success")
            router.push(getTravelURL(travelId as string))
        }).catch((err) => {
            notification(t(getErrorTranslateKey(err)), "error")
        })
    }, [expenseId, router, t, travelId, updateExpense])

    const handleRemove = useCallback(() => {
        deleteExpense(Number(expenseId)).then(() => {
            notification(t(common.delete_expense_success), "success")
            router.push(getTravelURL(travelId as string))
        }).catch((err) => {
            notification(t(getErrorTranslateKey(err)), "error")
        })
    }, [deleteExpense, expenseId, router, t, travelId])

    return <EditExpenseTemplate
        expense={{ ...expense, date: formatDate(new Date(expense.date)) }}
        headerText={t(common.edit_expense)}
        onSubmit={handleSubmit}
        travelId={Number(travelId)}
        footer={<DangerZone resource={t(common.expense)} buttonText={t(common.delete_expense)} onClick={handleRemove} />}
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
    return {
        props: {
            session: ctx.req.session,
        },
    }
}))

export default AddTravelPage;

