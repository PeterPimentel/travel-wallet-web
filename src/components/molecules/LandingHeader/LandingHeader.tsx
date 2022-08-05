import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import classname from "classnames";

import { AppLogo } from "../../atoms/AppLogo/AppLogo";
import { CommonLink } from "../../atoms/CommonLink/CommonLink"
import { NavigationLink } from "../../atoms/NavigationLink/NavigationLink";

import style from "./style.module.css";
import { useRouter } from "next/router";

const MENU_OPTIONS = [
    {
        label: "landing:menu_home",
        url: "#home",
        path: "/#home"
    },
    {
        label: "landing:menu_features",
        url: "#features",
        path: "/#features"
    },
    {
        label: "landing:menu_contacts",
        url: "#contact",
        path: "/#contact"
    },
]

export const LandingHeader = () => {
    const [scrollHeight, setScrollHeight] = useState(0);
    const { t } = useTranslation();
    const router = useRouter()

    const navBarStyle = classname(style.navigation, { [style.scrolled]: scrollHeight > 60 })

    const handleScroll = () => {
        setScrollHeight(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <nav className={navBarStyle}>
            <AppLogo variant="regular" size="large" />
            <ul className={style.menu}>
                {
                    MENU_OPTIONS.map(option => (
                        <li key={option.label} className={style.menuItem}>
                            <NavigationLink to={option.url}>{t(option.label)}</NavigationLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
