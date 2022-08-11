import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import classname from "classnames";
import { useRouter } from "next/router";

import { Text } from "../../atoms/Typography/Typography";
import { HamburguerMenu } from "../../molecules/HamburguerMenu/HamburguerMenu";
import { LogoWithName } from "../../molecules/LogoWithName/LogoWithName";

import style from "./style.module.css";

const MENU_OPTIONS = [
    {
        label: "landing:menu_home",
        url: "home",
    },
    {
        label: "landing:menu_features",
        url: "features",
    },
    {
        label: "landing:menu_contacts",
        url: "contact",
    },
    {
        label: "landing:sign_in",
        url: "/signin",
    },
    {
        label: "landing:sign_up",
        url: "/signup",
    },
]


type LandingHeaderProps = {
    onClick: (id: string) => void;
}

export const LandingHeader = ({ onClick }: LandingHeaderProps) => {
    const [scrollHeight, setScrollHeight] = useState(0);
    const { t } = useTranslation();
    const router = useRouter()

    const navBarStyle = classname(style.navigation, { [style.scrolled]: scrollHeight > 60 })

    const handleScroll = () => {
        setScrollHeight(window.scrollY);
    };

    const handleOnClick = (url: string) => {
        if (url.includes("/")) {
            router.push(url)
        } else {
            onClick(url);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <nav className={navBarStyle}>
            <LogoWithName size="large" layout="horizontal" />
            <div>
                <ul className={style.menu}>
                    {
                        MENU_OPTIONS.map(option => (
                            <li key={option.label} className={style.menuItem} onClick={() => handleOnClick(option.url)}>
                                <Text>{t(option.label)}</Text>
                            </li>
                        ))
                    }
                </ul>
                <div className={style.hamburguerMenu}>
                    <HamburguerMenu menus={MENU_OPTIONS} onClick={handleOnClick} />
                </div>
            </div>
        </nav>
    )
}
