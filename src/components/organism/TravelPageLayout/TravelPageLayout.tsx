import { useRouter } from 'next/router'

import { useTravel } from '../../../hooks/useTravel';

import { PageLoader } from '../../molecules/PageLoader/PageLoader';
import { TravelFooter } from '../../molecules/TravelFooter/TravelFooter';
import { TravelHeader } from '../../molecules/TravelHeader/TravelHeader';

import styles from "./style.module.css"

interface TravelPageLayoutProps {
    children: React.ReactNode;
}

export const TravelPageLayout = ({ children }: TravelPageLayoutProps) => {
    const route = useRouter();

    const { data, isLoading } = useTravel(Number(route.query.id));

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
        <TravelFooter id={route.query.id as string} />
    </div>
}

export default TravelPageLayout;

