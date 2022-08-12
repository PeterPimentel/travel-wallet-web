import { FC } from "react";
import { useTranslation } from "next-i18next";
import { FaListUl, FaPlusCircle, FaChartPie } from "react-icons/fa";
import { useRouter } from "next/router";

import { ROUTES } from "../../../constants";

import { NavigationLink } from "../../atoms/NavigationLink/NavigationLink";

import styles from "./style.module.css";

interface TravelFooterProps {
    id: string;
}

export const TravelFooter: FC<TravelFooterProps> = ({ id }) => {
    const { t } = useTranslation();
    const router = useRouter()

    return (
        <footer className={styles.footer}>
            <nav className={styles.navList}>
                <NavigationLink to={`/${ROUTES.travel}/${id}`} active={router.pathname === "/travel/[id]"}>
                    <FaListUl />
                    <span>{t('expenses')}</span>
                </NavigationLink>
                <NavigationLink to={`/${ROUTES.travel}/${id}/${ROUTES.newExpense}`} active={router.pathname === "/travel/[id]/expense/new"} >
                    <FaPlusCircle />
                    <span>{t('add')}</span>
                </NavigationLink>
                <NavigationLink to={`/${ROUTES.travel}/${id}/${ROUTES.overview}`} active={router.pathname === "/travel/[id]/overview"}>
                    <FaChartPie />
                    <span>{t('overview')}</span>
                </NavigationLink>
            </nav>
        </footer>
    )
}