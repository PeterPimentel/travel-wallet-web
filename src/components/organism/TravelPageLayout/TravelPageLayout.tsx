import { useRouter } from 'next/router'

import useTravels from '../../../hooks/useTravels';
import { getSelectedTravel } from '../../../util';

import { PageLoader } from '../../molecules/PageLoader/PageLoader';
import { TravelFooter } from '../../molecules/TravelFooter/TravelFooter';
import { TravelHeader } from '../../molecules/TravelHeader/TravelHeader';
import { NotFoundTemplate } from '../../templates/NotFoundTemplate/NotFoundTemplate';

import styles from "./style.module.css"

interface TravelPageLayoutProps {
    children: React.ReactNode;
}

export const TravelPageLayout = ({ children }: TravelPageLayoutProps) => {
    const router = useRouter();
    const expenseId = router.query.expenseId;
    const travelId = router.query.id
    const { data, isLoading } = useTravels()
    const { travel, expenses, hasExpense, hasTravel } = getSelectedTravel(data, Number(travelId), Number(expenseId))

    if (isLoading) {
        return <PageLoader isLoading={isLoading} />
    }

    if (!hasTravel || (!!expenseId && !hasExpense)) {
        return <NotFoundTemplate />
    }

    return <div className={styles.page}>
        <TravelHeader name={travel.name} expenses={expenses} budget={travel.budget} />
        <div className={styles.pageContent}>
            {children}
        </div>
        <TravelFooter id={travelId as string} />
    </div>
}

export default TravelPageLayout;

