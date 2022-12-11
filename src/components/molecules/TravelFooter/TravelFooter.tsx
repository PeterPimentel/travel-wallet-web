import { FC } from "react";
import useTranslation from 'next-translate/useTranslation'
import { FaListUl, FaPlusCircle, FaChartPie, FaMap } from "react-icons/fa";
import { useRouter } from "next/router";

import { getMapURL, getNewExpenseURL, getOverviewURL, getTravelURL } from "../../../util";
import { common } from "../../../constants/locales";

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
                <NavigationLink to={`${getTravelURL(id)}${getMapURL()}`} active={router.pathname === "/travel/[id]/map"}>
                    <FaMap />
                    <span>{t(common.map)}</span>
                </NavigationLink>
            </nav>
        </footer>
    )
}