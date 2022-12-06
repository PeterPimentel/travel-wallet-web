import { useCallback } from 'react';
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { ExpenseRequest } from '../../../../src/types/ApiType';
import { withSession } from '../../../../src/lib/withSession';
import { useStoreActions } from 'easy-peasy';
import { StoreActions } from '../../../../src/types/StoreType';
import { common } from '../../../../src/constants/locales';

import { EditExpenseTemplate } from '../../../../src/components/templates/ExpenseEditTemplate/EditExpenseTemplate';
import TravelPageLayout from '../../../../src/components/organism/TravelPageLayout/TravelPageLayout';
import { notification } from '../../../../src/components/atoms/Notification/Notification';
import { getTravelURL } from '../../../../src/util';

export const AddTravelPage = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const createExpense = useStoreActions<StoreActions>(
        (actions) => actions.createExpenseRequest
    );

    const travelId = router.query.id;

    const handleSubmit = useCallback((expense: ExpenseRequest) => {
        createExpense({
            ...expense,
            travelId: Number(travelId),
        }).then(() => {
            notification(t(common.expense_create_success), "success")
            router.push(getTravelURL(travelId as string))
        }).catch((err) => {
            notification(err.message, "error")
        })
    }, [travelId, createExpense, t, router])

    return <EditExpenseTemplate travelId={Number(travelId)} headerText={t(common.add_expense)} onSubmit={handleSubmit} />
}

AddTravelPage.getLayout = function getLayout(page) {
    return (
        <TravelPageLayout>
            {page}
        </TravelPageLayout>
    )
}

export const getServerSideProps = (withSession(async function ({
    req,
}) {

    return {
        props: {
            session: req.session,
        },
    }
}))

export default AddTravelPage;

