import { FC } from "react";
import useTranslation from 'next-translate/useTranslation'
import { FaListUl, FaPlusCircle, FaChartPie } from "react-icons/fa";
import { useRouter } from "next/router";

import { common } from "../../../constants/locales";
import { getNewExpenseURL, getOverviewURL, getTravelURL } from "../../../util";

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
                <NavigationLink to={getTravelURL(id)} active={router.pathname === "/travel/[id]"}>
                    <FaListUl />
                    <span>{t(common.expenses)}</span>
                </NavigationLink>
                <NavigationLink to={`${getTravelURL(id)}${getNewExpenseURL()}`} active={router.pathname === "/travel/[id]/expense/new"} >
                    <FaPlusCircle />
                    <span>{t(common.add)}</span>
                </NavigationLink>
                <NavigationLink to={`${getTravelURL(id)}${getOverviewURL()}`} active={router.pathname === "/travel/[id]/overview"}>
                    <FaChartPie />
                    <span>{t(common.overview)}</span>
                </NavigationLink>
            </nav>
        </footer>
    )
}