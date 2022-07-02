import { useRouter } from 'next/router'
import { ROUTES } from '../../../constants';

import { useTravel } from '../../../hooks/useTravel';

import { PageLoader } from '../../molecules/PageLoader/PageLoader';
import { TravelFooter } from '../../molecules/TravelFooter/TravelFooter';
import { TravelHeader } from '../../molecules/TravelHeader/TravelHeader';

import styles from "./style.module.css"

interface TravelPageLayoutProps {
    children: React.ReactNode;
}

export const TravelPageLayout = ({ children }: TravelPageLayoutProps) => {
    const router = useRouter();
    const { data, isLoading } = useTravel(Number(router.query.id));

    const expenses = data ? data.expenses : []
    const travel = data ? data : { name: "" }

    if (isLoading) {
        return <PageLoader isLoading={isLoading} />
    }

    return <div className={styles.page}>
        <TravelHeader name={travel.name} expenses={expenses} />
        <div className={styles.pageContent}>
            {children}
        </div>
        <TravelFooter id={router.query.id as string} />
    </div>
}

export default TravelPageLayout;

