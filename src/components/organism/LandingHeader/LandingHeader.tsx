import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import classname from "classnames";
import { useRouter } from "next/router";

import { getLandingURL } from "../../../util";

import { AppLogo } from "../../atoms/AppLogo/AppLogo";
import { CommonLink } from "../../atoms/CommonLink/CommonLink"

import style from "./style.module.css";
import { HamburguerMenu } from "../../molecules/HamburguerMenu/HamburguerMenu";
import { Text } from "../../atoms/Typography/Typography";

const MENU_OPTIONS = [
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
            <CommonLink to={getLandingURL()}>
                <AppLogo variant="regular" size="large" />
            </CommonLink>
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
