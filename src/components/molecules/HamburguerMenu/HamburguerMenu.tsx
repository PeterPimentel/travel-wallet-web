import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import classname from "classnames";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

import { Text } from "../../atoms/Typography/Typography";

import style from "./style.module.css";

type MenuItem = { label: string; url: string }

type HamburguerMenuProps = {
    menus: MenuItem[];
    onClick: (url: string) => void
}

export const HamburguerMenu = ({ menus, onClick }: HamburguerMenuProps) => {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const menuRef = useRef();

    useOnClickOutside(menuRef, () => setOpen(false));

    const menuStyle = classname(style.menu, { [style.closed]: !open })

    return (
        <div ref={menuRef} className={style.hamburguerMenu}>
            {
                open ?
                    <FaTimes className={style.menuIcon} onClick={() => setOpen(false)} />
                    : <FaBars className={style.menuIcon} onClick={() => setOpen(true)} />
            }
            <ul className={menuStyle}>
                {
                    menus.map(option => (
                        <li key={option.label} className={style.menuItem} onClick={() => onClick(option.url)}>
                            <Text>{t(option.label)}</Text>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
